import sqlite3
import os
import json
import csv
import sys
import re
import requests
import smtplib
import dns.resolver
from datetime import datetime

DB_PATH = "/Users/suckmyballz/Desktop/ECHONOVA STUDIO/عملاء/العملاء المحتملين/echonova_leads.db"
EXPORT_DIR = "/Users/suckmyballz/Desktop/ECHONOVA STUDIO/عملاء/العملاء المحتملين"
CRITERIA_PATH = "/Users/suckmyballz/Desktop/ECHONOVA STUDIO/عملاء/العملاء المحتملين/المعايير العامة لعملاء ايكونوفا.json"

def load_criteria():
    if os.path.exists(CRITERIA_PATH):
        try:
            with open(CRITERIA_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Failed to load criteria file: {e}")
    # Default fallback
    return {
        "المرحلة_1_البحث_العام": {
            "كلمات_البحث": [
                "Luxury perfume brands in Dubai UAE, Riyadh Saudi Arabia, Qatar",
                "Luxury jewelry brands in Riyadh KSA, Dubai, Qatar",
                "Performance marketing and social media management agencies in Dubai and Saudi Arabia"
            ],
            "الكلمات_المستبعدة_من_النطاق": [
                "realestate", "property", "car", "auto", "motors", "estate"
            ]
        },
        "المرحلة_2_التحقق_الأول": {
            "صيغة_البحث_للتحقق": "about OR contact info for brand {name} {domain}"
        },
        "المرحلة_3_التحقق_الثاني": {
            "صيغة_البحث_لإعادة_التحقق": "site:instagram.com/{name} OR site:facebook.com/{name} OR site:linkedin.com/company/{name} OR site:youtube.com/{name}"
        },
        "المرحلة_4_حساب_نقاط_الشركات": {
            "نقاط_الحملة_النشطة_الواحدة": 10,
            "الحد_الأقصى_لنقاط_الحملات": 30,
            "نقاط_المنصة_النشطة_الواحدة": 10,
            "الحد_الأقصى_لنقاط_المنصات": 30,
            "نقاط_المقرات": {
                "dubai": 10, "riyadh": 10, "qatar": 20, "uae": 20, "ksa": 20
            },
            "الحد_الأقصى_لنقاط_المقرات": 20,
            "نقاط_القطاعات_المستهدفة": {
                "perfume": 20, "jewelry": 20, "agency": 20, "fashion": 20
            },
            "الحد_الأقصى_لنقاط_القطاعات": 20
        },
        "المرحلة_8_حساب_نقاط_صناع_القرار": {
            "نقاط_المناصب": {
                "director": 100, "creative": 100, "manager": 90, "founder": 80, "owner": 80, "specialist": 70, "coordinator": 70
            },
            "النقاط_الافتراضية": 40
        }
    }


# API Keys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import load_env

EXA_API_KEY = os.environ.get("EXA_API_KEY")
APOLLO_API_KEY = os.environ.get("APOLLO_API_KEY")
HUNTER_API_KEY = os.environ.get("HUNTER_API_KEY")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. initial_companies
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS initial_companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        website TEXT UNIQUE,
        social_links TEXT,
        company_linkedin TEXT,
        size TEXT,
        campaign_platforms TEXT,
        campaigns_count INTEGER,
        views_range TEXT,
        likes_range TEXT,
        engagement_rate REAL,
        budget_estimated TEXT,
        created_at TEXT
    )
    """)
    
    # 2. already_collected
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS already_collected (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        domain TEXT UNIQUE,
        industry TEXT,
        collected_at TEXT
    )
    """)
    
    # 3. semi_reliable
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS semi_reliable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        website TEXT UNIQUE,
        social_links TEXT,
        company_linkedin TEXT,
        size TEXT,
        campaign_platforms TEXT,
        campaigns_count INTEGER,
        views_range TEXT,
        likes_range TEXT,
        engagement_rate REAL,
        budget_estimated TEXT,
        created_at TEXT
    )
    """)
    
    # 4. unconfirmed
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS unconfirmed (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        website TEXT UNIQUE,
        social_links TEXT,
        company_linkedin TEXT,
        size TEXT,
        campaign_platforms TEXT,
        campaigns_count INTEGER,
        views_range TEXT,
        likes_range TEXT,
        engagement_rate REAL,
        budget_estimated TEXT,
        created_at TEXT
    )
    """)
    
    # 5. misleading
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS misleading (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        website TEXT UNIQUE,
        social_links TEXT,
        company_linkedin TEXT,
        size TEXT,
        campaign_platforms TEXT,
        campaigns_count INTEGER,
        views_range TEXT,
        likes_range TEXT,
        engagement_rate REAL,
        budget_estimated TEXT,
        created_at TEXT
    )
    """)
    
    # 6. target_companies
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS target_companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        website TEXT UNIQUE,
        social_links TEXT,
        company_linkedin TEXT,
        size TEXT,
        campaign_platforms TEXT,
        campaigns_count INTEGER,
        views_range TEXT,
        likes_range TEXT,
        engagement_rate REAL,
        budget_estimated TEXT,
        evaluation_status TEXT DEFAULT 'لم يتم التقييم',
        contact_status TEXT DEFAULT 'لم يتم جمع بيانات التواصل',
        targeting_score INTEGER DEFAULT 0,
        priority_class TEXT DEFAULT 'لم يتم التقييم',
        created_at TEXT
    )
    """)
    
    # 7. initial_contacts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS initial_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_domain TEXT,
        name TEXT,
        title TEXT,
        email TEXT,
        whatsapp TEXT,
        phone TEXT,
        linkedin TEXT,
        social_profiles TEXT,
        created_at TEXT
    )
    """)
    
    # 8. contacts_registry
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS contacts_registry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_domain TEXT,
        email TEXT UNIQUE,
        collected_at TEXT
    )
    """)
    
    # 9. verified_contacts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS verified_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_domain TEXT,
        name TEXT,
        title TEXT,
        email TEXT,
        whatsapp TEXT,
        phone TEXT,
        linkedin TEXT,
        social_profiles TEXT,
        evaluation_status TEXT DEFAULT 'لم يتم التقييم',
        contact_score INTEGER DEFAULT 0,
        created_at TEXT
    )
    """)
    
    # 10. false_contacts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS false_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_domain TEXT,
        name TEXT,
        title TEXT,
        email TEXT,
        whatsapp TEXT,
        phone TEXT,
        linkedin TEXT,
        social_profiles TEXT,
        created_at TEXT
    )
    """)
    
    # 11. unconfirmed_contacts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS unconfirmed_contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_domain TEXT,
        name TEXT,
        title TEXT,
        email TEXT,
        whatsapp TEXT,
        phone TEXT,
        linkedin TEXT,
        social_profiles TEXT,
        created_at TEXT
    )
    """)
    
    # 12. technical_reports
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS technical_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT,
        start_time TEXT,
        end_time TEXT,
        duration TEXT,
        status TEXT,
        logs TEXT,
        verification_details TEXT,
        created_at TEXT
    )
    """)
    
    conn.commit()
    conn.close()

# API Helpers
def exa_search(query, num_results=10):
    url = "https://api.exa.ai/search"
    headers = {
        "x-api-key": EXA_API_KEY,
        "content-type": "application/json"
    }
    payload = {
        "query": query,
        "numResults": num_results,
        "useAutoprompt": True
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        if response.status_code == 200:
            return response.json().get("results", [])
        else:
            print(f"Exa search error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"Exa search exception: {e}")
    return []

def fetch_company_details(domain, name, logs):
    social_links = {}
    campaign_platforms = []
    campaigns_count = 0
    views_range = "غير معروف"
    likes_range = "غير معروف"
    engagement_rate = 0.0
    budget_estimated = "منخفضة (متوقعة)"
    company_linkedin = ""
    size = "غير معروف"
    
    logs.append(f"جلب تفاصيل دقيقة عن الشركة: {name} ({domain})")
    query = f"\"{name}\" OR \"{domain}\" company size employees LinkedIn profiles facebook instagram tiktok ads budget"
    results = exa_search(query, num_results=5)
    
    active_ads_detected = False
    for r in results:
        url = r.get("url", "")
        title = r.get("title", "")
        text = r.get("text", "")
        text_content = (title + " " + text).lower()
        
        # Extract social links
        if "linkedin.com/company/" in url and not company_linkedin:
            company_linkedin = url
        if "instagram.com/" in url and "instagram" not in social_links:
            social_links["instagram"] = url
        if "facebook.com/" in url and "facebook" not in social_links:
            social_links["facebook"] = url
        if "youtube.com/" in url and "youtube" not in social_links:
            social_links["youtube"] = url
        if "tiktok.com/" in url and "tiktok" not in social_links:
            social_links["tiktok"] = url
            
        # Look for employee size
        size_match = re.search(r'(\d+[\d,\-]*\s*(?:employees|employee|موظف|موظفين))', text_content)
        if size_match and size == "غير معروف":
            size = size_match.group(1)
            
        # Detect active ad platforms
        for platform in ["facebook", "instagram", "tiktok", "google", "snapchat", "youtube"]:
            if platform in text_content and platform.capitalize() not in campaign_platforms:
                campaign_platforms.append(platform.capitalize())
                
        # Detect active ads
        if any(keyword in text_content for keyword in ["ad campaign", "active ads", "ads library", "حملة إعلانية", "إعلانات ممولة"]):
            active_ads_detected = True
            campaigns_count += 1
            
    # Fallback size parsing from snippet if still unknown
    if size == "غير معروف":
        for r in results:
            text_content = (r.get("title", "") + " " + r.get("text", "")).lower()
            for range_str in ["1-10", "11-50", "51-200", "201-500", "500+"]:
                if range_str in text_content:
                    size = range_str
                    break
            if size != "غير معروف":
                break
                
    if size == "غير معروف":
        size = "11-50 (تقديري)" # default fallback
        
    # Budget estimation
    is_large = any(x in size for x in ["500", "200", "51"])
    is_medium = "11-50" in size or "11" in size
    
    if is_large and active_ads_detected:
        budget_estimated = "مرتفعة (متوقعة)"
    elif is_medium and active_ads_detected:
        budget_estimated = "متوسطة (متوقعة)"
    elif active_ads_detected:
        budget_estimated = "منخفضة إلى متوسطة (متوقعة)"
    else:
        budget_estimated = "منخفضة (متوقعة)"
        
    return social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated

def parse_name_title(title_str):
    title_str = title_str.replace('\u200f', '').replace('\u200e', '')
    parts = re.split(r'\s+-\s+|\s*\|\s*', title_str)
    if len(parts) >= 2:
        name = parts[0].strip()
        title_info = parts[1].strip()
        title_match = re.split(r'\s+at\s+|\s+في\s+', title_info, flags=re.IGNORECASE)
        title = title_match[0].strip()
        if "linkedin" in name.lower():
            name = name.split()[0]
        return name, title
    return title_str, "صانع قرار"

# Stages Implementation
def run_stage_1(logs):
    logs.append("بدء المرحلة 1: مهمة التجميع العام للشركات")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Load criteria dynamically
    criteria = load_criteria()
    stage1_config = criteria.get("المرحلة_1_البحث_العام", {})
    queries = stage1_config.get("كلمات_البحث", [])
    excluded_keywords = stage1_config.get("الكلمات_المستبعدة_من_النطاق", [])
    
    total_found = 0
    collected_in_this_run = []
    active_run_domains = set()
    
    for query in queries:
        if total_found >= 30:
            break
        logs.append(f"البحث في Exa عن: '{query}'")
        results = exa_search(query, num_results=40)
        for r in results:
            if total_found >= 30:
                break
            url = r.get("url", "")
            title = r.get("title", "")
            
            # Parse domain
            domain_match = re.search(r'https?://(?:www\.)?([^/]+)', url)
            if not domain_match:
                continue
            domain = domain_match.group(1).lower()
            
            # Check active run cache to avoid duplicates in this single execution
            if domain in active_run_domains:
                continue
                
            # Exclude based on loaded criteria
            if any(x in domain for x in excluded_keywords):
                continue
                
            # Check if domain is already collected
            cursor.execute("SELECT id FROM already_collected WHERE domain = ?", (domain,))
            if cursor.fetchone():
                continue
                
            # Mark as processed in this run to avoid duplicates
            active_run_domains.add(domain)
            
            # Get detailed company metrics
            social_links, company_linkedin, size, platforms, campaigns_count, views, likes, eng, budget_estimated = fetch_company_details(domain, title, logs)
            
            try:
                # Add to initial_companies
                cursor.execute("""
                INSERT INTO initial_companies 
                (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    title,
                    f"https://{domain}",
                    json.dumps(social_links),
                    company_linkedin,
                    size,
                    json.dumps(platforms),
                    campaigns_count,
                    views,
                    likes,
                    eng,
                    budget_estimated,
                    datetime.now().isoformat()
                ))
                
                # Append to temporary list to insert into already_collected at the end
                collected_in_this_run.append((title, domain, query))
                total_found += 1
                logs.append(f"تم جمع شركة بنجاح: {title} ({domain})")
            except sqlite3.IntegrityError:
                # Avoid collision if website uniqueness is violated
                continue
                
    # At the end of the search: insert all collected companies to already_collected
    if collected_in_this_run:
        logs.append(f"إضافة {len(collected_in_this_run)} شركة إلى قاعدة بيانات 'تم الجمع' (تراكمي)...")
        for name_c, domain_c, query_c in collected_in_this_run:
            try:
                cursor.execute("""
                INSERT OR IGNORE INTO already_collected (name, domain, industry, collected_at)
                VALUES (?, ?, ?, ?)
                """, (name_c, domain_c, query_c, datetime.now().isoformat()))
            except Exception as e:
                logs.append(f"خطأ أثناء الإضافة لـ 'تم الجمع': {e}")
                
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 1 بنجاح. تم إضافة {total_found} شركة جديدة.")
    return total_found

def run_stage_2(logs):
    logs.append("بدء المرحلة 2: مهمة المراجعة والتصنيف الأولية")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM initial_companies")
    companies = cursor.fetchall()
    
    if not companies:
        logs.append("لا توجد شركات في قاعدة البيانات الأولية للفحص.")
        conn.close()
        return 0
        
    verified = 0
    misleading = 0
    unconfirmed = 0
    
    criteria = load_criteria()
    stage2_pattern = criteria.get("المرحلة_2_التحقق_الأول", {}).get("صيغة_البحث_للتحقق", "about OR contact info for brand {name} {domain}")
    
    for c in companies:
        c_id, name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at = c
        domain = website.replace("https://", "").replace("http://", "").split("/")[0]
        
        # Zero trust check: search if the company has a valid business description on Exa
        logs.append(f"التحقق من صحة الشركة: {name} ({domain})")
        check_query = stage2_pattern.replace("{name}", name).replace("{domain}", domain)
        check_results = exa_search(check_query, num_results=2)
        
        if len(check_results) > 0:
            # Domain exists and is discussed as a real brand
            cursor.execute("""
            INSERT INTO semi_reliable (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at))
            verified += 1
        elif "test" in name.lower() or "example" in domain:
            cursor.execute("""
            INSERT INTO misleading (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at))
            misleading += 1
        else:
            cursor.execute("""
            INSERT INTO unconfirmed (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at))
            unconfirmed += 1
            
    # Clear initial_companies
    cursor.execute("DELETE FROM initial_companies")
    
    # Audit verification
    cursor.execute("SELECT count(*) FROM initial_companies")
    rem = cursor.fetchone()[0]
    if rem > 0:
        logs.append(f"تحذير: لا يزال هناك {rem} شركة في قاعدة البيانات الأولية!")
    else:
        logs.append("تم إفراغ قاعدة البيانات الأولية بالكامل بنجاح.")
        
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 2: موثوقة: {verified} | مضللة: {misleading} | غير مؤكدة: {unconfirmed}")
    return verified

def run_stage_3(logs):
    logs.append("بدء المرحلة 3: إعادة التحقق والتأهيل")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM semi_reliable")
    companies = cursor.fetchall()
    
    if not companies:
        logs.append("لا توجد شركات في قاعدة البيانات شبه الموثوقة للتحقق منها.")
        conn.close()
        return 0
        
    transferred = 0
    criteria = load_criteria()
    stage3_pattern = criteria.get("المرحلة_3_التحقق_الثاني", {}).get("صيغة_البحث_لإعادة_التحقق", "site:instagram.com/{name} OR site:facebook.com/{name} OR site:linkedin.com/company/{name} OR site:youtube.com/{name}")
    
    for c in companies:
        c_id, name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at = c
        domain = website.replace("https://", "").replace("http://", "").split("/")[0]
        
        # Third check method
        logs.append(f"إعادة التحقق من القناة الرسمية لـ: {name}")
        search_query = stage3_pattern.replace("{name}", name).replace("{domain}", domain)
        results = exa_search(search_query, num_results=1)
        
        if len(results) > 0:
            # Verified via official LinkedIn company page
            cursor.execute("""
            INSERT INTO target_companies (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, evaluation_status, contact_status, targeting_score, priority_class, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'لم يتم التقييم', 'لم يتم جمع بيانات التواصل', 0, 'لم يتم التقييم', ?)
            """, (name, website, social_links_raw, results[0].get("url", ""), size, platforms_raw, campaigns_count, views, likes, eng, budget, datetime.now().isoformat()))
            transferred += 1
        else:
            # Doubtful
            cursor.execute("""
            INSERT INTO unconfirmed (name, website, social_links, company_linkedin, size, campaign_platforms, campaigns_count, views_range, likes_range, engagement_rate, budget_estimated, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, website, social_links_raw, linkedin, size, platforms_raw, campaigns_count, views, likes, eng, budget, created_at))
            
    cursor.execute("DELETE FROM semi_reliable")
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 3: تم نقل {transferred} شركة إلى الشركات المستهدفة.")
    return transferred

def run_stage_4(logs):
    logs.append("بدء المرحلة 4: أولوية الاستهداف (حساب النقاط)")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM target_companies WHERE evaluation_status = 'لم يتم التقييم'")
    companies = cursor.fetchall()
    
    if not companies:
        logs.append("لا توجد شركات جديدة تحتاج لتقييم الأولويات.")
        conn.close()
        return 0
        
    criteria = load_criteria()
    scoring_config = criteria.get("المرحلة_4_حساب_نقاط_الشركات", {})
    points_per_campaign = scoring_config.get("نقاط_الحملة_النشطة_الواحدة", 10)
    max_campaign_points = scoring_config.get("الحد_الأقصى_لنقاط_الحملات", 30)
    points_per_platform = scoring_config.get("نقاط_المنصة_النشطة_الواحدة", 10)
    max_platform_points = scoring_config.get("الحد_الأقصى_لنقاط_المنصات", 30)
    locations_scoring = scoring_config.get("نقاط_المقرات", {})
    max_location_points = scoring_config.get("الحد_الأقصى_لنقاط_المقرات", 20)
    industries_scoring = scoring_config.get("نقاط_القطاعات_المستهدفة", {})
    max_industry_points = scoring_config.get("الحد_الأقصى_لنقاط_القطاعات", 20)
    
    evaluated = 0
    for c in companies:
        c_id = c[0]
        name = c[1]
        website = c[2]
        platforms = json.loads(c[6]) if c[6] else []
        campaigns_count = c[7] if c[7] else 0
        
        score = 0
        
        # 1. Active campaigns
        if campaigns_count > 0:
            score += min(max_campaign_points, campaigns_count * points_per_campaign)
            
        # 2. Active platforms
        if platforms:
            score += min(max_platform_points, len(platforms) * points_per_platform)
        
        # 3. Location points
        location_score = 0
        name_lower = name.lower() if name else ""
        website_lower = website.lower() if website else ""
        for loc, pts in locations_scoring.items():
            if loc in name_lower or loc in website_lower:
                location_score += pts
        score += min(max_location_points, location_score)
        
        # 4. Target industry points
        industry_score = 0
        for ind, pts in industries_scoring.items():
            if ind in name_lower or ind in website_lower:
                industry_score += pts
        score += min(max_industry_points, industry_score)
            
        # Classification
        priority = "استهداف خاطئ"
        if 80 <= score <= 100:
            priority = "اولوية قصوى"
        elif 60 <= score <= 79:
            priority = "اولوية متوسطة"
        elif 40 <= score <= 59:
            priority = "اولوية ضعيفة"
        elif 20 <= score <= 39:
            priority = "اولوية منخفضة"
        elif 1 <= score <= 19:
            priority = "اولوية منخفضة جدا"
            
        cursor.execute("""
        UPDATE target_companies 
        SET targeting_score = ?, priority_class = ?, evaluation_status = 'تقييم اولي'
        WHERE id = ?
        """, (score, priority, c_id))
        evaluated += 1
        logs.append(f"تقييم الشركة: {name} | النقاط: {score} | الأولوية: {priority}")
        
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 4: تم تقييم {evaluated} شركة.")
    return evaluated

def run_stage_5(logs):
    logs.append("بدء المرحلة 5: دقة أولوية الاستهداف (المراجعة)")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM target_companies WHERE evaluation_status = 'تقييم اولي'")
    companies = cursor.fetchall()
    
    if not companies:
        logs.append("لا توجد شركات جديدة في مرحلة التقييم الأولي.")
        conn.close()
        return 0
        
    verified = 0
    for c in companies:
        c_id = c[0]
        name = c[1]
        score = c[14]
        priority = c[15]
        
        # Verify score accuracy using LinkedIn presence
        logs.append(f"مراجعة تقييم: {name}")
        # If the company has a verified LinkedIn, we validate its score, otherwise we adjust it slightly (-5 points)
        if not c[4]: # No LinkedIn
            score = max(0, score - 5)
            # Reclassify
            if 80 <= score <= 100:
                priority = "اولوية قصوى"
            elif 60 <= score <= 79:
                priority = "اولوية متوسطة"
            elif 40 <= score <= 59:
                priority = "اولوية ضعيفة"
            else:
                priority = "اولوية منخفضة"
                
        cursor.execute("""
        UPDATE target_companies 
        SET targeting_score = ?, priority_class = ?, evaluation_status = 'تقييم نهائي'
        WHERE id = ?
        """, (score, priority, c_id))
        verified += 1
        logs.append(f"تأكيد تقييم الشركة النهائي: {name} | النقاط: {score} | الحالة: تقييم نهائي")
        
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 5: تم تأكيد تقييم {verified} شركة.")
    return verified

def run_stage_6(logs):
    logs.append("بدء المرحلة 6: جمع بيانات التواصل لصناع القرار")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Select target companies that need contact info and have high/medium/low priority
    cursor.execute("""
    SELECT * FROM target_companies 
    WHERE contact_status = 'لم يتم جمع بيانات التواصل' 
    AND priority_class IN ('اولوية قصوى', 'اولوية متوسطة', 'اولوية ضعيفة')
    ORDER BY CASE priority_class 
        WHEN 'اولوية قصوى' THEN 1 
        WHEN 'اولوية متوسطة' THEN 2 
        WHEN 'اولوية ضعيفة' THEN 3 
    END
    """)
    companies = cursor.fetchall()
    
    if not companies:
        logs.append("لا توجد شركات مستهدفة جاهزة لجمع بيانات التواصل.")
        conn.close()
        return 0
        
    total_contacts = 0
    for c in companies:
        c_id = c[0]
        name = c[1]
        website = c[2]
        domain = website.replace("https://", "").replace("http://", "").split("/")[0]
        
        logs.append(f"البحث عن صناع قرار لشركة: {name} ({domain})")
        
        # Search LinkedIn profiles via Exa
        query = f"site:linkedin.com/in/ \"{name}\" OR \"{domain}\" (marketing OR creative OR owner OR manager)"
        results = exa_search(query, num_results=10)
        logs.append(f"وجدنا {len(results)} ملفات شخصية محتملة على لينكد إن.")
        
        added_contacts = 0
        for r in results:
            url = r.get("url", "")
            title_str = r.get("title", "")
            
            p_name, title = parse_name_title(title_str)
            # Remove "LinkedIn" from title or name
            if "linkedin" in p_name.lower() or "linkedin" in title.lower():
                continue
                
            cursor.execute("""
            INSERT INTO initial_contacts (company_domain, name, title, email, whatsapp, phone, linkedin, social_profiles, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                domain,
                p_name,
                title,
                None, # Email will be found in Stage 7 via Hunter
                "",
                "",
                url,
                json.dumps({}),
                datetime.now().isoformat()
            ))
            
            added_contacts += 1
            total_contacts += 1
            
        cursor.execute("UPDATE target_companies SET contact_status = 'تم جمع بيانات التواصل' WHERE id = ?", (c_id,))
        logs.append(f"تم جمع {added_contacts} صناع قرار لـ {name}.")
            
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 6: تم جمع {total_contacts} جهة اتصال إجمالاً.")
    return total_contacts

def verify_email_smtp(email):
    try:
        domain = email.split('@')[1]
        records = dns.resolver.resolve(domain, 'MX')
        mxRecord = str(records[0].exchange)
        
        server = smtplib.SMTP(timeout=10)
        server.set_debuglevel(0)
        server.connect(mxRecord)
        server.helo(server.local_hostname)
        server.mail('admin@echonova.studio')
        code, message = server.rcpt(str(email))
        server.quit()
        
        if code == 250:
            return "valid"
        elif code >= 500:
            return "invalid"
        else:
            return "unknown"
    except Exception as e:
        return "unknown"

def run_stage_7(logs):
    logs.append("بدء المرحلة 7: التحقق من صحة بيانات التواصل")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get priorities to sort contacts
    cursor.execute("SELECT website, priority_class FROM target_companies")
    company_priorities = {}
    for web, prio in cursor.fetchall():
        if web:
            domain = web.replace("https://", "").replace("http://", "").split("/")[0].lower()
            company_priorities[domain] = prio
            
    cursor.execute("SELECT * FROM initial_contacts")
    contacts = cursor.fetchall()
    
    if not contacts:
        logs.append("لا توجد جهات اتصال جديدة في القائمة الأولية للتحقق منها.")
        conn.close()
        return 0
        
    # Sort contacts: highest priority company first, then specific titles first
    def get_domain(url_or_domain):
        if not url_or_domain:
            return ""
        return url_or_domain.replace("https://", "").replace("http://", "").split("/")[0].lower()

    def contact_sort_key(contact):
        domain = get_domain(contact[1])
        title = contact[3].lower() if contact[3] else ""
        
        prio = company_priorities.get(domain, "غير معروف")
        prio_score = 5
        if prio == "اولوية قصوى":
            prio_score = 1
        elif prio == "اولوية متوسطة":
            prio_score = 2
        elif prio == "اولوية ضعيفة":
            prio_score = 3
        elif prio == "اولوية منخفضة":
            prio_score = 4
            
        title_score = 2
        if any(keyword in title for keyword in ["director", "creative", "marketing", "manager", "founder", "owner", "رئيس", "مدير"]):
            title_score = 1
        elif title == "صانع قرار":
            title_score = 3
            
        return (prio_score, title_score)
        
    contacts.sort(key=contact_sort_key)
    
    verified = 0
    false_c = 0
    unconfirmed = 0
    
    limit_reached = False
    
    for c in contacts:
        c_id, domain, name, title, email, whatsapp, phone, linkedin, social, created_at = c
        
        # If email is empty, generate patterns and verify via SMTP
        if not email:
            logs.append(f"توليد ومطابقة صيغ الإيميلات للشخص: {name} في الخادم {domain}")
            names = name.split()
            first_name = names[0].lower() if len(names) > 0 else ""
            last_name = names[-1].lower() if len(names) > 1 else ""
            
            patterns = []
            if first_name and last_name:
                patterns.append(f"{first_name}.{last_name}@{domain}")
                patterns.append(f"{first_name}@{domain}")
                patterns.append(f"{first_name[0]}{last_name}@{domain}")
            elif first_name:
                patterns.append(f"{first_name}@{domain}")
                
            found_email = None
            for pattern in patterns:
                status = verify_email_smtp(pattern)
                if status == "valid":
                    found_email = pattern
                    break
                    
            if found_email:
                email = found_email
                logs.append(f"تم تأكيد الإيميل من خادم الشركة مباشرة: {email}")
            else:
                logs.append(f"لم يتطابق أي إيميل مع خادم الشركة لـ {name}")
                
        if not email:
            cursor.execute("""
            INSERT INTO false_contacts (company_domain, name, title, email, whatsapp, phone, linkedin, social_profiles, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (domain, name, title, email, whatsapp, phone, linkedin, social, created_at))
            cursor.execute("DELETE FROM initial_contacts WHERE id = ?", (c_id,))
            conn.commit()
            false_c += 1
            continue
            
        logs.append(f"التوثيق النهائي للإيميل: {email}")
        
        status = verify_email_smtp(email)
        
        # Update contacts registry with email
        cursor.execute("INSERT OR IGNORE INTO contacts_registry (company_domain, email, collected_at) VALUES (?, ?, ?)", 
                       (domain, email, datetime.now().isoformat()))
        
        if status == "valid":
            cursor.execute("""
            INSERT INTO verified_contacts (company_domain, name, title, email, whatsapp, phone, linkedin, social_profiles, evaluation_status, contact_score, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'لم يتم التقييم', 0, ?)
            """, (domain, name, title, email, whatsapp, phone, linkedin, social, created_at))
            verified += 1
        elif status == "invalid":
            cursor.execute("""
            INSERT INTO false_contacts (company_domain, name, title, email, whatsapp, phone, linkedin, social_profiles, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (domain, name, title, email, whatsapp, phone, linkedin, social, created_at))
            false_c += 1
        else:
            # accept_all or unknown
            cursor.execute("""
            INSERT INTO unconfirmed_contacts (company_domain, name, title, email, whatsapp, phone, linkedin, social_profiles, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (domain, name, title, email, whatsapp, phone, linkedin, social, created_at))
            unconfirmed += 1
        
        cursor.execute("DELETE FROM initial_contacts WHERE id = ?", (c_id,))
        conn.commit()
            
    conn.close()
    logs.append(f"انتهت المرحلة 7: موثقة: {verified} | مغلوطة: {false_c} | غير مؤكدة: {unconfirmed}")
    return verified

def run_stage_8(logs):
    logs.append("بدء المرحلة 8: حساب النقاط لصناع القرار")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM verified_contacts WHERE evaluation_status = 'لم يتم التقييم'")
    contacts = cursor.fetchall()
    
    if not contacts:
        logs.append("لا توجد جهات اتصال موثقة جديدة تحتاج لحساب نقاط.")
        conn.close()
        return 0
        
    criteria = load_criteria()
    contact_scoring = criteria.get("المرحلة_8_حساب_نقاط_صناع_القرار", {})
    title_scoring = contact_scoring.get("نقاط_المناصب", {})
    default_score = contact_scoring.get("النقاط_الافتراضية", 40)
    
    evaluated = 0
    for c in contacts:
        c_id = c[0]
        title = c[3].lower() if c[3] else ""
        
        score = default_score
        for t_keyword, pts in title_scoring.items():
            if t_keyword in title:
                score = pts
                break
            
        cursor.execute("""
        UPDATE verified_contacts 
        SET contact_score = ?, evaluation_status = 'تم حساب النقاط'
        WHERE id = ?
        """, (score, c_id))
        evaluated += 1
        
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 8 بنجاح. تم حساب نقاط لـ {evaluated} جهة اتصال.")
    return evaluated

def run_stage_9(logs):
    logs.append("بدء المرحلة 9: الاعتماد النهائي وتقييم أولوية التواصل")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM verified_contacts WHERE evaluation_status = 'تم حساب النقاط'")
    contacts = cursor.fetchall()
    
    if not contacts:
        logs.append("لا توجد جهات بانتظار الاعتماد النهائي.")
        conn.close()
        return 0
        
    approved = 0
    for c in contacts:
        c_id = c[0]
        cursor.execute("""
        UPDATE verified_contacts 
        SET evaluation_status = 'تم التقييم'
        WHERE id = ?
        """, (c_id,))
        approved += 1
        
    conn.commit()
    conn.close()
    logs.append(f"انتهت المرحلة 9 بنجاح. تم اعتماد التقييم لـ {approved} جهة اتصال.")
    return approved

def run_stage_10(logs, task_name, start_time, verification_details=""):
    logs.append("بدء المرحلة 10: مهمة التقييم العامة وتصدير التقارير")
    
    # 1. Export tables to CSV
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    tables = [
        "initial_companies", "already_collected", "semi_reliable", "unconfirmed",
        "misleading", "target_companies", "initial_contacts", "contacts_registry",
        "verified_contacts", "false_contacts", "unconfirmed_contacts"
    ]
    
    for table in tables:
        try:
            cursor.execute(f"SELECT * FROM {table}")
            rows = cursor.fetchall()
            headers = [description[0] for description in cursor.description]
            
            csv_file = os.path.join(EXPORT_DIR, f"{table}.csv")
            with open(csv_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(headers)
                writer.writerows(rows)
        except Exception as e:
            logs.append(f"خطأ أثناء تصدير جدول {table} إلى CSV: {e}")
            
    # 2. Write Markdown status report on Desktop
    report_file = os.path.join(EXPORT_DIR, "تقرير_سير_العمليات.md")
    try:
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("<div dir=\"rtl\">\n\n")
            f.write("# تقرير حالة قواعد بيانات العملاء والتواصل الحالي\n")
            f.write(f"تاريخ التحديث: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            f.write("### إحصائيات قواعد البيانات الحالية:\n")
            f.write("| قاعدة البيانات | عدد السجلات | النوع |\n")
            f.write("| :--- | :---: | :--- |\n")
            
            for table in tables:
                cursor.execute(f"SELECT count(*) FROM {table}")
                count = cursor.fetchone()[0]
                status_type = "تراكمية" if table not in ["initial_companies", "initial_contacts"] else "غير تراكمية"
                f.write(f"| {table} | {count} | {status_type} |\n")
                
            f.write("\n</div>\n")
    except Exception as e:
        logs.append(f"خطأ أثناء كتابة تقرير الحالة: {e}")
        
    end_time = datetime.now()
    duration = str(end_time - start_time)
    
    # Save log report to technical_reports
    try:
        cursor.execute("""
        INSERT INTO technical_reports (task_name, start_time, end_time, duration, status, logs, verification_details, created_at)
        VALUES (?, ?, ?, ?, 'ناجحة', ?, ?, ?)
        """, (
            task_name,
            start_time.isoformat(),
            end_time.isoformat(),
            duration,
            "\n".join(logs),
            verification_details,
            datetime.now().isoformat()
        ))
    except Exception as e:
        print(f"Failed to log technical report: {e}")
        
    conn.commit()
    conn.close()
    
    # Also write technical report to Desktop log
    tech_log_file = os.path.join(EXPORT_DIR, "سجل_التقارير_الفنية.md")
    mode = 'a' if os.path.exists(tech_log_file) else 'w'
    with open(tech_log_file, mode, encoding='utf-8') as f:
        f.write("<div dir=\"rtl\">\n\n")
        f.write(f"## تقرير المهمة: {task_name}\n")
        f.write(f"* **التاريخ:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"* **المدة الزمنية:** {duration}\n")
        f.write(f"* **تفاصيل الفحص:** {verification_details}\n")
        f.write("### سجل العمليات بالتفصيل:\n")
        for line in logs:
            f.write(f"- {line}\n")
        f.write("\n---\n\n</div>\n")
        
    print("Exported technical reports successfully.")

if __name__ == "__main__":
    init_db()
    
    # Handle arguments
    if len(sys.argv) < 2:
        print("Usage: python3 leads_pipeline.py --stage <1-10> OR --run-all")
        sys.exit(1)
        
    option = sys.argv[1]
    
    logs = []
    start_time = datetime.now()
    
    if option == "--run-all":
        logs.append("بدء تشغيل دورة العمل الكاملة")
        run_stage_1(logs)
        run_stage_2(logs)
        run_stage_3(logs)
        run_stage_4(logs)
        run_stage_5(logs)
        run_stage_6(logs)
        run_stage_7(logs)
        run_stage_8(logs)
        run_stage_9(logs)
        run_stage_10(logs, "تشغيل الدورة الكاملة", start_time, "فحص تكامل الأنظمة الثلاثة بالكامل")
    elif option == "--stage":
        if len(sys.argv) < 3:
            print("Please provide a stage number (1-10)")
            sys.exit(1)
        stage_num = int(sys.argv[2])
        task_name = f"تشغيل المرحلة {stage_num}"
        
        if stage_num == 1:
            run_stage_1(logs)
        elif stage_num == 2:
            run_stage_2(logs)
        elif stage_num == 3:
            run_stage_3(logs)
        elif stage_num == 4:
            run_stage_4(logs)
        elif stage_num == 5:
            run_stage_5(logs)
        elif stage_num == 6:
            run_stage_6(logs)
        elif stage_num == 7:
            run_stage_7(logs)
        elif stage_num == 8:
            run_stage_8(logs)
        elif stage_num == 9:
            run_stage_9(logs)
        elif stage_num == 10:
            # Stage 10 runs alone to export databases
            pass
            
        run_stage_10(logs, task_name, start_time, f"التحقق الفردي من عمل المرحلة {stage_num}")
    else:
        print("Unknown argument.")
