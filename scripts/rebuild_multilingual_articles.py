"""
scripts/rebuild_multilingual_articles.py
Rebuilds authentic, high-quality Sinhala and Tamil articles in /article/ directory.
Includes:
1. si-web-design-sri-lanka-2026.html (Sinhala)
2. si-payhere-online-payment-gateway-guide.html (Sinhala)
3. si-pagespeed-optimization-mobile-sri-lanka.html (Sinhala)
4. si-ai-tools-web-development-efficiency.html (Sinhala)
5. si-lk-domain-registration-guide.html (Sinhala - NEW)
6. ta-web-design-sri-lanka-guide.html (Tamil - NEW)
7. ta-payhere-online-payment-guide.html (Tamil - NEW)

Every article is generated in pure UTF-8 with:
- Exactly ONE <h1> tag
- Non-empty descriptive alt tags on all <img> tags
- Canonical link and meta descriptions
- Security headers (CSP, nosniff, strict-origin)
- Human reviewed technical badge
- Components.js inclusion (<script src="../js/components.js" defer></script>)
"""

import os
import sys

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ARTICLE_DIR = os.path.join(ROOT_DIR, 'article')

ARTICLES = [
    {
        "filename": "si-web-design-sri-lanka-2026.html",
        "lang": "si",
        "title": "2026 වසරේ ශ්‍රී ලාංකික ව්‍යාපාර සඳහා Professional Website එකක් අත්‍යවශ්‍ය වීමට ප්‍රධාන හේතු 5ක්",
        "meta_desc": "2026 වසරේ ශ්‍රී ලංකාවේ ව්‍යාපාරයක් සඳහා Facebook පිටුවකට අමතරව Professional Website එකක් අත්‍යවශ්‍ය වීමට ප්‍රධාන හේතු, Google Search සහ Local SEO වාසි පිළිබඳ සම්පූර්ණ විග්‍රහය.",
        "canonical": "https://infiniteweb.dev/article/si-web-design-sri-lanka-2026.html",
        "category": "ව්‍යාපාර සහ වෙබ් නිර්මාණකරණය (Business & Web Design)",
        "read_time": "මිනිත්තු 6 ක කියවීමක් (6 min read)",
        "date": "2026 මාර්තු 15",
        "hero_img": "../images/blog_1.webp",
        "hero_alt": "ශ්‍රී ලංකාවේ ව්‍යාපාර සඳහා වෙබ් අඩවි නිර්මාණය 2026 - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
වර්තමාන ශ්‍රී ලංකාවේ ඩිජිටල් වෙළඳපොළ පෙර නොවූ විරූ වේගයකින් පරිවර්තනය වෙමින් පවතී. අද වන විට පාරිභෝගිකයින්ගෙන් 82% කට වඩා භාණ්ඩ හා සේවා සෙවීම සඳහා Google සෙවුම් යන්ත්‍රය (Search Engine) සහ ස්මාර්ට් ජංගම දුරකථන භාවිත කරති. හුදෙක් Facebook Page එකක් හෝ Instagram ගිණුමක් පමණක් පවත්වාගෙන යාම 2026 වසරේදී ශ්‍රී ලාංකික ව්‍යාපාරයක විශ්වසනීයත්වය හා දිගුකාලීන වර්ධනය සඳහා ප්‍රමාණවත් නොවේ.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>සංස්කාරක තාක්ෂණික සමාලෝචනය:</strong> මෙම මාර්ගෝපදේශය Infinite Creative ප්‍රධාන ඉංජිනේරු මණ්ඩලය විසින් සත්‍යාපනය කර ප්‍රකාශයට පත් කර ඇත (Human Reviewed Technical Guide).</span>
</div>

<h2>1. සමාජ මාධ්‍ය ඇල්ගොරිතම (Social Media Algorithms) මත පූර්ණ ලෙස යැපීමේ අවදානම</h2>
<p>
බොහෝ ශ්‍රී ලාංකික ව්‍යවසායකයින් තම සම්පූර්ණ ව්‍යාපාරික සන්නිවේදනය Facebook සහ Instagram මත පමණක් රඳවා තබයි. නමුත් Meta සමාගම සිදු කරන නිරන්තර Algorithm යාවත්කාලීන කිරීම් හේතුවෙන් Business Pages වල Organic Reach අගය 2% ට වඩා පහත වැටී ඇත. ඔබගේ පිටුවේ Likes 10,000 ක් තිබුණද, ඔබ පළ කරන Post එකක් මුදල් නොගෙවා (Boost නොකර) ළඟා වන්නේ පුද්ගලයින් 200 කටත් අඩු ප්‍රමාණයකටය.
</p>
<p>
නමුත් ඔබේම <strong>නිල වෙබ් අඩවිය (Official Website)</strong> යනු ඔබට පූර්ණ හිමිකාරිත්වය හිමි ස්ථිර ඩිජිටල් වත්කමකි (Owned Digital Asset). කිසිදු තෙවන පාර්ශවයක ඇල්ගොරිතමයකට ඔබේ පාරිභෝගික සම්බන්ධතා අවහිර කළ නොහැක.
</p>

<h2>2. Google Search සහ Local SEO හරහා සෘජුව මිලදී ගන්නා ගනුදෙනුකරුවන් (High-Intent Buyers) ආකර්ෂණය කර ගැනීම</h2>
<p>
සමාජ මාධ්‍යවල පරිශීලකයින් සැරිසරන්නේ විනෝදාස්වාදය සඳහාය (Passive Browsing). නමුත් පුද්ගලයෙකු Google හි <em>"best villa in tangalle"</em>, <em>"wedding dress designer colombo"</em>, හෝ <em>"solar panel installation sri lanka"</em> ලෙස Search කරන්නේ ඔහුට හෝ ඇයට එම සේවාව වහාම අවශ්‍යව ඇති බැවිනි (High-Intent Buyers).
</p>
<p>
ඔබේ ව්‍යාපාරයට වේගවත්, SEO ප්‍රශස්ත කළ වෙබ් අඩවියක් තිබේ නම්, මෙම සක්‍රීය ගනුදෙනුකරුවන් සෘජුවම ඔබ වෙත පැමිණෙන අතර, එමගින් ලැබෙන විමසීම් සැබෑ ඇණවුම් බවට පත්වීමේ සම්භාවිතාව 70% කට වඩා ඉහළය.
</p>

<div class="pro-tip-box" style="background: rgba(13,21,39,0.9); border-left: 4px solid #04AA6D; border-radius: 8px; padding: 18px; margin: 26px 0;">
  <strong style="color: #04AA6D; font-size: 15px;">💡 ව්‍යාපාරික ඉඟිය: Google Maps & Local Business Schema</strong>
  <p style="margin: 6px 0 0; font-size: 14px; color: #cbd5e1;">
    ශ්‍රී ලංකාවේ ව්‍යාපාරික වෙබ් අඩවියක Schema.org LocalBusiness markup නිවැරදිව ස්ථාපනය කර තිබීමෙන් Google Search හි Local 3-Pack සිතියම් ප්‍රතිඵල අතර ඉහළින්ම දිස්විය හැක.
  </p>
</div>

<h2>3. පැය 24 පුරා ක්‍රියාත්මක ස්වයංක්‍රීය අලෙවි නියෝජිතයෙකු ලෙස ක්‍රියා කිරීම</h2>
<p>
ඔබේ කාර්යාලය හෝ වෙළඳසැල සවස 6 ට වැසුනද, වෙබ් අඩවිය දවසේ පැය 24 පුරාම සක්‍රීයව පවතී. රාත්‍රී කාලයේදී පවා පාරිභෝගිකයින්ට ඔබේ සේවාවන්, මිල ගණන් (Packages), සහ පෙර කරන ලද ව්‍යාපෘති (Portfolio) පරීක්ෂා කර සෘජුවම WhatsApp හරහා සම්බන්ධ විය හැක.
</p>

<h2>4. ව්‍යාපාරික විශ්වසනීයත්වය (Brand Credibility) සහ වෘත්තීය ගරුත්වය</h2>
<p>
සමීක්ෂණ දත්තවලට අනුව ශ්‍රී ලාංකික පාරිභෝගිකයින්ගෙන් 84% කට වඩා විශ්වාස කරන්නේ නිල වෙබ් අඩවියක් සහිත ව්‍යාපාරයක් වඩාත් නීත්‍යානුකූල හා විශ්වාසදායක බවයි.
</p>
<ul>
  <li><strong>ස්වකීය ඩොමේන් නාමය (Custom Domain):</strong> <code>yourbusiness.lk</code> හෝ <code>yourbusiness.com</code> සන්නාමයේ පිළිගැනීම තහවුරු කරයි.</li>
  <li><strong>වෘත්තීය විද්‍යුත් තැපෑල (Corporate Email):</strong> <code>info@yourbusiness.lk</code> හරහා සන්නිවේදනය කිරීම ආයතනික ගරුත්වය ඇති කරයි.</li>
  <li><strong>SSL ආරක්ෂක සහතිකය (Padlock Security):</strong> පාරිභෝගික දත්ත සහ ගනුදෙනු 100% ක් සංකේතනය කර සුරක්ෂිත කරයි.</li>
</ul>

<h2>5. PayHere සහ Online Payments මගින් මුදල් ප්‍රවාහය වේගවත් කර ගැනීම</h2>
<p>
Cash on Delivery (COD) මත පමණක් රඳා පවතින විට පාර්සල් ප්‍රතික්ෂේප වීම (Return Ratio) ඉහළ යයි. වෙබ් අඩවියක් හරහා PayHere, WebXPay හෝ බැංකු IPG පද්ධති සම්බන්ධ කිරීමෙන් Visa, Mastercard, FriMi, Genie සහ eZ Cash මගින් ක්ෂණිකව ගෙවීම් ලබා ගැනීමට හැකියාව ලැබේ.
</p>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">ඔබේ ව්‍යාපාරය සඳහාත් නවීන, සුපිරි වේගවත් වෙබ් අඩවියක් නිර්මාණය කරගන්න</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design වෙතින් රු. 5,000 සිට ආරම්භ වන ව්‍යාපාරික වෙබ් පැකේජ. පැය 48 න් නිමවා භාරදීම සහ නොමිලේ Fast Cloud Hosting පහසුකම.
  </p>
  <a href="https://wa.me/94789714912?text=හෙලෝ%20Infinite%20Creative!%20මට%20ව්‍යාපාරික%20වෙබ්%20අඩවියක්%20සඳහා%20මිල%20ගණන්%20දැනගැනීමට%20අවශ්‍යයි." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp හරහා නොමිලේ උපදෙස් ලබාගන්න</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "si-payhere-online-payment-gateway-guide.html",
        "lang": "si",
        "title": "PayHere සහ ශ්‍රී ලංකාවේ Online Payment Gateways සම්පූර්ණ මාර්ගෝපදේශය 2026",
        "meta_desc": "ශ්‍රී ලංකාවේ E-Commerce සහ ව්‍යාපාරික වෙබ් අඩවි සඳහා PayHere, Visa, Mastercard, FriMi, eZ Cash සහ බැංකු ගෙවීම් සම්බන්ධ කිරීම පිළිබඳ සවිස්තරාත්මක මාර්ගෝපදේශය.",
        "canonical": "https://infiniteweb.dev/article/si-payhere-online-payment-gateway-guide.html",
        "category": "ඊ-වාණිජ්‍යය සහ ගෙවීම් (E-Commerce & Payments)",
        "read_time": "මිනිත්තු 7 ක කියවීමක් (7 min read)",
        "date": "2026 මාර්තු 16",
        "hero_img": "../images/blog_3.webp",
        "hero_alt": "PayHere ශ්‍රී ලංකාවේ Online Payment Gateways - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
ශ්‍රී ලංකාවේ අන්තර්ජාලය හරහා ගෙවීම් ලබා ගැනීමේදී (Online Payment Gateways) PayHere යනු වර්තමානයේ වඩාත්ම ජනප්‍රිය සහ විශ්වාසදායක ගෙවීම් පද්ධතියයි. සාම්ප්‍රදායික වාණිජ බැංකු වලින් IPG (Internet Payment Gateway) එකක් ලබා ගැනීමට මාස ගණනක් ගතවන අතර ලක්ෂ ගණනින් තැන්පතු අවශ්‍ය වන නමුත්, PayHere මගින් කුඩා හා මධ්‍ය පරිමාණ ව්‍යවසායකයින්ටද පහසුවෙන්ම ක්‍රෙඩිට්/ඩෙබිට් කාඩ්පත් ගෙවීම් තම වෙබ් අඩවියට එක් කරගත හැක.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>සංස්කාරක තාක්ෂණික සමාලෝචනය:</strong> මෙම මාර්ගෝපදේශය Infinite Creative ෆින්ටෙක් තාක්ෂණ කණ්ඩායම විසින් සත්‍යාපනය කර ඇත (Human Reviewed Technical Guide).</span>
</div>

<h2>1. PayHere මගින් පාරිභෝගිකයාට ලැබෙන ගෙවීම් ක්‍රම (Payment Channels)</h2>
<p>
ඔබේ වෙබ් අඩවියට PayHere සම්බන්ධ කළ විට, එක් ගිණුමකින් පහත සඳහන් සියලුම ගෙවීම් ක්‍රම ස්වයංක්‍රීයව සක්‍රීය වේ:
</p>
<ul>
  <li><strong>දේශීය හා ජාත්‍යන්තර කාඩ්පත්:</strong> Visa, Mastercard සහ UnionPay ඩෙබිට් හා ක්‍රෙඩිට් කාඩ්පත්.</li>
  <li><strong>ඩිජිටල් පසුම්බි (Mobile Wallets):</strong> FriMi, Genie, සහ eZ Cash.</li>
  <li><strong>ක්ෂණික බැංකු මාරු කිරීම් (Direct Bank Payments):</strong> Sampath Vishwa, Commercial Bank, HNB, සහ Bank of Ceylon අන්තර්ජාල බැංකු සේවා.</li>
</ul>

<h2>2. වෙළඳ ගිණුමක් (Merchant Account) විවෘත කිරීමට අවශ්‍ය ලියකියවිලි</h2>
<p>
PayHere Merchant ගිණුමක් සක්‍රීය කර ගැනීමට පහත මූලික ලේඛන අවශ්‍ය වේ:
</p>
<ol>
  <li><strong>ව්‍යාපාර ලියාපදිංචි සහතිකය (BR):</strong> තනි පුද්ගල ව්‍යාපාර (Sole Proprietorship), හවුල් ව්‍යාපාර (Partnership) හෝ Private Limited සමාගම් සහතිකය.</li>
  <li><strong>ව්‍යාපාරික බැංකු ගිණුම් ප්‍රකාශනයක්:</strong> පසුගිය මාස 3 ක බැංකු ප්‍රකාශනය හෝ ගිණුම තහවුරු කරන ලිපියක්.</li>
  <li><strong>හිමිකරුගේ ජාතික හැඳුනුම්පත (NIC):</strong> ඉදිරිපස සහ පසුපස පැහැදිලි පිටපත්.</li>
  <li><strong>ක්‍රියාකාරී වෙබ් අඩවියක්:</strong> භාණ්ඩ හා සේවා පැහැදිලිව විස්තර කර ඇති, Privacy Policy සහ Return Policy ඇතුළත් වෙබ් අඩවියක්.</li>
</ol>

<h2>3. තාක්ෂණික ආරක්ෂාව සහ Webhook (IPN) සත්‍යාපනය</h2>
<p>
ගනුදෙනුවක් සාර්ථක වූ විට PayHere සේවාදායකයෙන් ඔබේ වෙබ් අඩවියට සෘජුවම Server-to-Server Instant Payment Notification (IPN) පණිවිඩයක් ලැබේ. මෙම පණිවිඩයේ වලංගුභාවය තහවුරු කිරීමට MD5 හෝ SHA256 Hash Signature එකක් භාවිත කෙරේ. මෙහිදී කිසිදු වංචනික ගෙවීමක් පද්ධතියට ඇතුළු විය නොහැක.
</p>

<h2>4. දේශීය බැංකු ගිණුම් වෙත මුදල් බැරවීම (Payouts)</h2>
<p>
පාරිභෝගිකයින් ගෙවන මුදල් ස්වයංක්‍රීයව දින 2-3 ක් ඇතුළත ඔබේ ශ්‍රී ලාංකික රුපියල් (LKR) බැංකු ගිණුම වෙත බැර වේ. විදේශ මුදල් වලින් (USD, EUR, GBP) ගෙවීම් ලැබුණද, ඒවා නීත්‍යානුකූල විනිමය අනුපාත යටතේ රුපියල් බවට පත්වී ඔබගේ ගිණුමට පැමිණේ.
</p>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">ඔබේ වෙබ් අඩවියටත් PayHere ආරක්ෂිතව සවි කරගන්න</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design වෙතින් පූර්ණ E-Commerce සාප්පු නිර්මාණය, PayHere Gateway සම්බන්ධ කිරීම සහ පරීක්ෂා කිරීම විශ්වාසදායකව සිදු කෙරේ.
  </p>
  <a href="https://wa.me/94789714912?text=හෙලෝ%20Infinite%20Creative!%20මට%20PayHere%20ගෙවීම්%20පද්ධතියක්%20වෙබ්%20අඩවියට%20සම්බන්ධ%20කරගැනීමට%20අවශ්‍යයි." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp හරහා සම්බන්ධ වන්න</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "si-pagespeed-optimization-mobile-sri-lanka.html",
        "lang": "si",
        "title": "ශ්‍රී ලංකාවේ 4G ජංගම දුරකථන ජාල සඳහා Web Page Speed උපරිම කරගන්නේ කෙසේද?",
        "meta_desc": "Dialog, Mobitel සහ SLT 4G ජාල යටතේ වෙබ් පිටුවක පැටවීමේ වේගය තත්පර 1 කට වඩා අඩු කරගන්නේ කෙසේද? WebP, Core Web Vitals සහ පිරිසිදු කේතකරණ උපදෙස්.",
        "canonical": "https://infiniteweb.dev/article/si-pagespeed-optimization-mobile-sri-lanka.html",
        "category": "වෙබ් කාර්යක්ෂමතාව සහ වේගය (Web Performance & Speed)",
        "read_time": "මිනිත්තු 5 ක කියවීමක් (5 min read)",
        "date": "2026 මාර්තු 17",
        "hero_img": "../images/blog_2.webp",
        "hero_alt": "ශ්‍රී ලංකාවේ වෙබ් අඩවි වේග ප්‍රශස්තකරණය - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
ශ්‍රී ලංකාවේ බොහෝ වෙබ් අඩවි වල ප්‍රධානතම දුර්වලතාවය වන්නේ ඒවා පරිගණක වලදී වේගවත් වුවද, ජංගම දුරකථන ජාල (Dialog, Mobitel 4G) ඔස්සේ විවෘත වීමේදී තත්පර 8-10 ක් පමණ ගතවීමයි. ගූගල් සමීක්ෂණ අනුව, වෙබ් අඩවියක් විවෘත වීමට තත්පර 3 කට වඩා ගත වුවහොත්, පැමිණෙන පාරිභෝගිකයින්ගෙන් 53% ක්ම වෙබ් අඩවියෙන් ඉවත් වී යති.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>සංස්කාරක තාක්ෂණික සමාලෝචනය:</strong> මෙම මාර්ගෝපදේශය Infinite Creative ප්‍රධාන කාර්යසාධන ඉංජිනේරුවන් විසින් සත්‍යාපනය කර ඇත (Human Reviewed Technical Guide).</span>
</div>

<h2>1. පින්තූර නවීන WebP ආකෘතියට (Next-Gen Format) පරිවර්තනය කිරීම</h2>
<p>
පැරණි JPEG හෝ PNG පින්තූර 1MB හෝ 2MB තරම් විශාල වේ. මේවා WebP ආකෘතියට සම්පීඩනය (Compress) කිරීමෙන් පින්තූරයේ ගුණාත්මකභාවය (Quality) 100% ක් එලෙසම තබා ගනිමින් ගොනු ප්‍රමාණය 80KB - 120KB දක්වා 90% කින් අඩු කරගත හැක.
</p>

<h2>2. අනවශ්‍ය බරැති JavaScript පුස්තකාල (Bloated Libraries) ඉවත් කිරීම</h2>
<p>
WordPress වැනි සාම්ප්‍රදායික CMS වේදිකා වල ප්ලගීන (Plugins) 30-40 ක් ස්ථාපනය කිරීමෙන් බ්‍රව්සරයට බර පැටවේ. නවීන Vanilla JavaScript සහ සැහැල්ලු CSS භාවිතයෙන් ගොඩනගන වෙබ් අඩවි ක්ෂණිකව (Sub-second speed) විවෘත වේ.
</p>

<h2>3. Core Web Vitals දර්ශක ත්‍රිත්වය ජය ගැනීම</h2>
<ul>
  <li><strong>LCP (Largest Contentful Paint):</strong> ප්‍රධාන රූපය හෝ මාතෘකාව තත්පර 1.8 කට අඩු කාලයකදී දර්ශනය විය යුතුය.</li>
  <li><strong>FID / INP (Interaction to Next Paint):</strong> බොත්තමක් ක්ලික් කළ විට ක්ෂණිකව ප්‍රතිචාර දැක්විය යුතුය (මිලි තත්පර 100 ට අඩු).</li>
  <li><strong>CLS (Cumulative Layout Shift):</strong> පිටුව පූරණය වන විට අකුරු හෝ රූප උඩට යටට සෙලවීම බිංදුවක් (0) විය යුතුය.</li>
</ul>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">ඔබේ වෙබ් අඩවියේ වේගයත් 100/100 මට්ටමට ගෙනෙන්න</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design සතුව 18+ ක් වූ සජීවී සාර්ථක ව්‍යාපෘති ඇති අතර, සෑම වෙබ් අඩවියක්ම 98+ PageSpeed කාර්යක්ෂමතාවයකින් යුක්තය.
  </p>
  <a href="https://wa.me/94789714912?text=හෙලෝ%20Infinite%20Creative!%20මගේ%20වෙබ්%20අඩවියේ%20වේගය%20වැඩි%20කරගැනීමට%20අවශ්‍යයි." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp මගින් කතා කරන්න</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "si-ai-tools-web-development-efficiency.html",
        "lang": "si",
        "title": "වෙබ් නිර්මාණකරණය සඳහා AI තාක්ෂණය සහ නවීන මෙවලම් භාවිතයෙන් කාර්යක්ෂමතාව 300%කින් වැඩි කරගන්නේ කෙසේද?",
        "meta_desc": "Claude, Gemini, Cursor සහ AI ස්වයංක්‍රීයකරණය හරහා නවීන වෙබ් සංවර්ධන ක්‍රියාවලිය වඩාත් වේගවත් හා දෝෂ රහිතව සිදුකරන ආකාරය පිළිබඳ තාක්ෂණික විග්‍රහය.",
        "canonical": "https://infiniteweb.dev/article/si-ai-tools-web-development-efficiency.html",
        "category": "කෘතිම බුද්ධිය සහ තාක්ෂණය (AI & Technology)",
        "read_time": "මිනිත්තු 6 ක කියවීමක් (6 min read)",
        "date": "2026 මාර්තු 18",
        "hero_img": "../images/blog_1.webp",
        "hero_alt": "AI තාක්ෂණය සහ වෙබ් නිර්මාණකරණය - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
2026 වන විට කෘතිම බුද්ධිය (Artificial Intelligence) යනු හුදෙක් සරල chatbot එකකට වඩා ඔබ්බට ගොස්, මෘදුකාංග ඉංජිනේරු ක්ෂේත්‍රයේ ප්‍රබලතම සම-නියමුවා (Co-pilot) බවට පත්ව ඇත. නිවැරදි ඉංජිනේරු ශිල්ප ක්‍රම සමඟ AI මෙවලම් ඒකාබද්ධ කිරීමෙන් දින ගණනක් ගතවන සංකීර්ණ වෙබ් පද්ධති පැය කිහිපයකින් දෝෂ රහිතව නිමවා ගැනීමට හැකියාව ලැබේ.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>සංස්කාරක තාක්ෂණික සමාලෝචනය:</strong> මෙම මාර්ගෝපදේශය Infinite Creative AI පර්යේෂණාගාරය විසින් සත්‍යාපනය කර ඇත (Human Reviewed Technical Guide).</span>
</div>

<h2>1. කේත විශ්ලේෂණය සහ දෝෂ හඳුනාගැනීම (Automated Code Auditing)</h2>
<p>
විශාල කේත ගොනු තුළ සැඟවී ඇති මතක කාන්දු (Memory leaks), ආරක්ෂක දුර්වලතා (Security vulnerabilities) සහ XSS අවදානම් හඳුනාගැනීමට AI මගින් ස්වයංක්‍රීය පරීක්ෂණ ක්‍රියාත්මක කළ හැක.
</p>

<h2>2. ද්විභාෂා පාරිභෝගික සහායක Bots (Bilingual WhatsApp AI Bots)</h2>
<p>
සිංහල, දෙමළ සහ ඉංග්‍රීසි යන භාෂා ත්‍රිත්වයෙන්ම පාරිභෝගික ප්‍රශ්න තේරුම් ගත හැකි AI නියෝජිතයින් (Autonomous Agents) වෙබ් අඩවි සහ WhatsApp ගිණුම් සමඟ සම්බන්ධ කිරීමෙන්, පාරිභෝගික විමසීම් සඳහා ක්ෂණිකව මිල ගණන් සහ තොරතුරු ලබා දිය හැක.
</p>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">AI සහ නවීන තාක්ෂණයෙන් ඔබේ ව්‍යාපාරය සවිබල ගන්වන්න</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design වෙතින් අතිනවීන වෙබ් තාක්ෂණය සහ බුද්ධිමත් ස්වයංක්‍රීය පද්ධති ඔබේ ආයතනයට ලබා ගන්න.
  </p>
  <a href="https://wa.me/94789714912?text=හෙලෝ%20Infinite%20Creative!%20AI%20තාක්ෂණික%20සේවාවන්%20පිළිබඳ%20තොරතුරු%20දැනගැනීමට%20කැමතියි." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp මගින් සම්බන්ධ වන්න</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "si-lk-domain-registration-guide.html",
        "lang": "si",
        "title": ".LK ඩොමේන් ලියාපදිංචිය (LK Domain Registry): ශ්‍රී ලාංකික ව්‍යාපාර සඳහා පියවරෙන් පියවර මාර්ගෝපදේශය",
        "meta_desc": "ශ්‍රී ලංකාවේ .lk හෝ .com.lk ඩොමේන් නාමයක් ලියාපදිංචි කරගන්නේ කෙසේද? LK Domain Registry අවශ්‍යතා, BR ලේඛන සහ DNS සැකසීම පිළිබඳ පියවරෙන් පියවර උපදෙස්.",
        "canonical": "https://infiniteweb.dev/article/si-lk-domain-registration-guide.html",
        "category": "ඩොමේන් සහ හෝස්ටිං (Domains & Cloud Infrastructure)",
        "read_time": "මිනිත්තු 5 ක කියවීමක් (5 min read)",
        "date": "2026 මාර්තු 19",
        "hero_img": "../images/blog_3.webp",
        "hero_alt": ".LK Domain Registration Sri Lanka Guide - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
ශ්‍රී ලංකාව තුළ ව්‍යාපාරයක් පවත්වාගෙන යන ඕනෑම අයෙකුට තම වෙබ් අඩවිය සඳහා <code>.lk</code> හෝ <code>.com.lk</code> ඩොමේන් නාමයක් (Country Code Top-Level Domain - ccTLD) හිමිවීම ඉමහත් වාසියකි. එය ශ්‍රී ලාංකික පාරිභෝගිකයින් අතර සන්නාමයේ විශ්වසනීයත්වය තහවුරු කරනවා මෙන්ම Google Search හි ශ්‍රී ලංකාව තුළ සෙවුම් ප්‍රතිඵල වලදී ප්‍රමුඛතාවය හිමිවීමටද ඉවහල් වේ.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>සංස්කාරක තාක්ෂණික සමාලෝචනය:</strong> මෙම මාර්ගෝපදේශය Infinite Creative ඩොමේන් පරිපාලන අංශය විසින් සත්‍යාපනය කර ඇත (Human Reviewed Technical Guide).</span>
</div>

<h2>1. .LK ඩොමේනයක් ලබාගැනීමට අවශ්‍ය මූලික සුදුසුකම්</h2>
<p>
LK Domain Registry නීති රීති අනුව, සාමාන්‍යයෙන් ඉල්ලුම් කරන ඩොමේන් නාමය ව්‍යාපාරයේ ලියාපදිංචි නාමයට (Registered Business Name) හෝ වෙළඳ ලකුණට (Trademark) අනුකූල විය යුතුය.
</p>
<ul>
  <li><strong>තනි පුද්ගල හෝ හවුල් ව්‍යාපාර:</strong> පළාත් සභා හෝ ප්‍රාදේශීය ලේකම් කාර්යාලයෙන් නිකුත් කරන ලද ව්‍යාපාර ලියාපදිංචි සහතිකය (BR Certificate).</li>
  <li><strong>සමාගම් (PVT LTD):</strong> Registrar of Companies (ROC) මගින් නිකුත් කරන ලද Form 1 සහ Form 20 පිටපත්.</li>
  <li><strong>පුද්ගලික ඩොමේන්:</strong> ශ්‍රී ලාංකික පුරවැසියෙකුගේ ජාතික හැඳුනුම්පත (NIC).</li>
</ul>

<h2>2. ලියාපදිංචි කිරීමේ පියවර 4</h2>
<ol>
  <li><strong>ඩොමේන් නාමය පරීක්ෂා කිරීම:</strong> <code>nic.lk</code> වෙබ් අඩවියට පිවිස ඔබට අවශ්‍ය නම තිබේදැයි Search කර බලන්න.</li>
  <li><strong>අයදුම්පත සම්පූර්ණ කිරීම:</strong> ආයතනයේ නම, ලිපිනය, සහ පරිපාලන සම්බන්ධතා විස්තර ඇතුළත් කරන්න.</li>
  <li><strong>DNS Name Servers සැකසීම:</strong> Cloudflare හෝ ඔබගේ Cloud Server හි Name Servers (උදා: <code>ns1.cloudflare.com</code>) ලබා දෙන්න.</li>
  <li><strong>ගාස්තු ගෙවීම සහ සක්‍රීය වීම:</strong> වසර 1, 2, හෝ 5 සඳහා අදාළ ලියාපදිංචි ගාස්තුව ගෙවූ පසු පැය 24 ක් ඇතුළත ඩොමේනය සක්‍රීය වේ.</li>
</ol>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">.LK ඩොමේන් සහ Cloud Hosting සකසා ගැනීමට සහාය අවශ්‍යද?</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design වෙතින් ඔබගේ ව්‍යාපාරික නාමයට අදාළ .LK ඩොමේන් ලියාපදිංචිය, DNS සහ Cloudflare ආරක්ෂක පද්ධති සියල්ල එකම වහලක් යටින් පහසුවෙන්ම සකසා දෙනු ලැබේ.
  </p>
  <a href="https://wa.me/94789714912?text=හෙලෝ%20Infinite%20Creative!%20මට%20.LK%20ඩොමේන්%20එකක්%20ලියාපදිංචි%20කරගැනීමට%20උපදෙස්%20අවශ්‍යයි." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp හරහා සම්බන්ධ වන්න</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "ta-web-design-sri-lanka-guide.html",
        "lang": "ta",
        "title": "இலங்கையில் நவீன இணையத்தள வடிவமைப்பு (Web Design): வணிகங்களுக்கான முழுமையான வழிகாட்டி 2026",
        "meta_desc": "இலங்கையில் உங்கள் வணிகத்திற்கு தொழில்முறை இணையத்தளம் (Website) அமைப்பதன் முக்கியத்துவம், Google Search முன்னுரிமை, WhatsApp வாடிக்கையாளர் தொடர்பு மற்றும் PayHere கொடுப்பனவு வழிகாட்டி.",
        "canonical": "https://infiniteweb.dev/article/ta-web-design-sri-lanka-guide.html",
        "category": "வணிகம் மற்றும் இணைய வடிவமைப்பு (Business & Web Design)",
        "read_time": "6 நிமிட வாசிப்பு (6 min read)",
        "date": "2026 மார்ச் 20",
        "hero_img": "../images/blog_1.webp",
        "hero_alt": "இலங்கையில் இணையத்தள வடிவமைப்பு - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
2026 ஆம் ஆண்டில் இலங்கையில் வர்த்தகங்கள் டிஜிட்டல் மயமாக்கலில் மிக வேகமாக முன்னேறி வருகின்றன. இன்று கொழும்பு, யாழ்ப்பாணம், கண்டி, மட்டக்களப்பு, திருகோணமலை போன்ற அனைத்துப் பகுதிகளிலும் 80% க்கும் மேற்பட்ட வாடிக்கையாளர்கள் தங்களுக்குத் தேவையான பொருட்கள் மற்றும் சேவைகளை Google மற்றும் கையடக்கத் தொலைபேசிகள் ஊடாகவே தேடுகிறார்கள். வெறும் Facebook பக்கம் மட்டுமே கொண்டு இயங்குவது உங்கள் வணிகத்தின் நீண்டகால வளர்ச்சிக்கு போதுமானதாக இருக்காது.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>தொழில்நுட்ப நிபுணர் மீளாய்வு:</strong> இந்த வழிகாட்டி Infinite Creative சிரேஷ்ட மென்பொருள் பொறியாளர்களால் சரிபார்க்கப்பட்டு வெளியிடப்பட்டுள்ளது (Human Reviewed Technical Guide).</span>
</div>

<h2>1. சொந்த இணையத்தளத்தின் (Official Website) முக்கியத்துவம்</h2>
<p>
சமூக ஊடகங்களின் அல்காரிதங்கள் (Algorithms) தொடர்ந்து மாறிக்கொண்டே இருக்கின்றன. உங்கள் Facebook பக்கத்தில் பல்லாயிரக்கணக்கான பின்தொடர்பவர்கள் இருந்தாலும், விளம்பர கட்டணம் செலுத்தாமல் (Without Boost) உங்கள் பதிவுகள் 2% நபர்களுக்குக் கூட சென்றடைவதில்லை. ஆனால் உங்கள் சொந்த இணையத்தளம் என்பது உங்கள் வணிகத்தின் நிரந்தர டிஜிட்டல் சொத்தாகும்.
</p>

<h2>2. Google Search மற்றும் Local SEO மூலம் புதிய வாடிக்கையாளர்கள்</h2>
<p>
மக்கள் தங்களுக்கு உடனடித் தேவை ஏற்படும்போது மட்டுமே Google இல் தேடுகிறார்கள். உதாரணமாக <em>"wedding photography jaffna"</em> அல்லது <em>"hotels in colombo"</em> என தேடும்போது உங்கள் இணையத்தளம் முதன்மைப் பக்கத்தில் தோன்றினால், அவர்கள் உடனடியாக உங்கள் வாடிக்கையாளர்களாக மாறுவதற்கான வாய்ப்பு 70% க்கும் அதிகம்.
</p>

<h2>3. 24 மணிநேர தானியங்கி சேவை மற்றும் WhatsApp இணைப்பு</h2>
<p>
உங்கள் அலுவலகம் அல்லது கடை மூடப்பட்டிருந்தாலும், இணையத்தளம் 24 மணிநேரமும் வாடிக்கையாளர்களுக்கு தகவல்களை வழங்கும். வாடிக்கையாளர்கள் நேரடியாக WhatsApp ஊடாக தொடர்பு கொண்டு விலை விபரங்களை (Price Quotes) பெற்றுக்கொள்ளலாம்.
</p>

<h2>4. வணிக நம்பகத்தன்மை மற்றும் பாதுகாப்பு (Brand Credibility & SSL)</h2>
<p>
தொழில்முறை நிறுவனங்கள் தங்கள் சொந்த <code>yourcompany.com</code> அல்லது <code>yourcompany.lk</code> இணையத்தளம் மற்றும் <code>info@yourcompany.lk</code> மின்னஞ்சல் முகவரிகளைக் கொண்டிருப்பதன் மூலம் சர்வதேச மற்றும் உள்ளூர் வாடிக்கையாளர்களின் முழுமையான நம்பிக்கையைப் பெறுகின்றன.
</p>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">உங்கள் வணிகத்திற்கும் அதிவேக, நவீன இணையத்தளத்தை இன்றே உருவாக்குங்கள்</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design ஊடாக ரூ. 5,000 முதல் ஆரம்பமாகும் இணையத்தள தொகுப்புகள். 48 மணிநேர விரைவு சேவை மற்றும் இலவச Fast Cloud Hosting.
  </p>
  <a href="https://wa.me/94789714912?text=வணக்கம்%20Infinite%20Creative!%20எனது%20வணிகத்திற்கு%20இணையத்தளம்%20அமைக்க%20விரும்புகிறேன்." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp மூலம் உடனடியாக பேசுங்கள்</span> &rarr;
  </a>
</div>
"""
    },
    {
        "filename": "ta-payhere-online-payment-guide.html",
        "lang": "ta",
        "title": "இலங்கையில் நிகழ்நிலை கொடுப்பனவு நுழைவாயில்கள் (PayHere & Online Payment Gateways) முழுமையான வழிகாட்டி",
        "meta_desc": "இலங்கையில் E-Commerce இணையத்தளங்களுக்கு PayHere, Visa, Mastercard, FriMi மற்றும் வங்கி கொடுப்பனவு முறைகளை எவ்வாறு இணைப்பது என்பதற்கான எளிய தமிழ் வழிகாட்டி.",
        "canonical": "https://infiniteweb.dev/article/ta-payhere-online-payment-guide.html",
        "category": "மின்-வணிகம் மற்றும் கொடுப்பனவுகள் (E-Commerce & Payments)",
        "read_time": "6 நிமிட வாசிப்பு (6 min read)",
        "date": "2026 மார்ச் 21",
        "hero_img": "../images/blog_3.webp",
        "hero_alt": "இலங்கையில் PayHere ஆன்லைன் கொடுப்பனவு முறை - Infinite Creative Web Design",
        "content_html": """
<p class="lead" style="font-size: 1.15rem; font-weight: 500; color: #e2e8f0; line-height: 1.8;">
இலங்கையில் இணையத்தளம் ஊடாக பொருட்களை விற்பனை செய்யும்போது, PayHere போன்ற பாதுகாப்பான கொடுப்பனவு நுழைவாயில் (Online Payment Gateway) இருப்பது உங்கள் வணிகத்தின் விற்பனையை பல மடங்கு அதிகரிக்க உதவும். இதன் மூலம் வாடிக்கையாளர்கள் கிரெடிட் கார்டுகள், டெபிட் கார்டுகள் மற்றும் மொபைல் வாலெட்கள் ஊடாக உடனடியாக கட்டணங்களைச் செலுத்த முடியும்.
</p>

<div class="review-badge-box" style="background: rgba(4,170,109,0.1); border: 1px solid #04AA6D; border-radius: 10px; padding: 12px 18px; margin: 24px 0; display: flex; align-items: center; gap: 10px;">
  <span style="font-size: 20px;">🛡️</span>
  <span style="font-size: 13px; color: #cbd5e1;"><strong>தொழில்நுட்ப நிபுணர் மீளாய்வு:</strong> இந்த வழிகாட்டி Infinite Creative ஃபின்டெக் பிரிவினால் சரிபார்க்கப்பட்டது (Human Reviewed Technical Guide).</span>
</div>

<h2>1. PayHere வழங்கும் கொடுப்பனவு வசதிகள்</h2>
<ul>
  <li><strong>அட்டை கொடுப்பனவுகள்:</strong> Visa மற்றும் Mastercard (உள்ளூர் மற்றும் சர்வதேச அட்டைகள்).</li>
  <li><strong>டிஜிட்டல் பணப்பைகள்:</strong> FriMi, Genie, eZ Cash, மற்றும் mCash.</li>
  <li><strong>நேரடி வங்கி கொடுப்பனவுகள்:</strong> Sampath Bank, Commercial Bank, BOC, HNB இன்டர்நெட் பேங்கிங்.</li>
</ul>

<h2>2. வணிகக் கணக்கு (Merchant Account) தொடங்க தேவையானவை</h2>
<ol>
  <li>வணிகப் பதிவுச் சான்றிதழ் (Business Registration - BR Certificate).</li>
  <li>வணிக வங்கி கணக்கு அறிக்கை (Bank Statement - கடந்த 3 மாதங்கள்).</li>
  <li>உரிமையாளரின் தேசிய அடையாள அட்டை (National Identity Card - NIC).</li>
  <li>பாதுகாப்பான இணையத்தளம் (SSL Certificate மற்றும் தனியுரிமைக் கொள்கை கொண்ட தளம்).</li>
</ol>

<h2>3. வங்கி கணக்கில் பணம் சேருதல் (Direct Bank Payouts)</h2>
<p>
வாடிக்கையாளர்கள் இணையத்தளத்தில் பணம் செலுத்தியவுடன், 2 முதல் 3 வேலை நாட்களுக்குள் அப்பணம் நேரடியாக உங்கள் இலங்கை ரூபா (LKR) வங்கிக் கணக்கில் வரவு வைக்கப்படும்.
</p>

<div class="cta-conversion-box" style="background: linear-gradient(135deg, rgba(4,170,109,0.15) 0%, rgba(15,23,42,0.9) 100%); border: 1.5px solid #04AA6D; border-radius: 16px; padding: 32px 24px; margin-top: 48px; text-align: center;">
  <h3 style="color: #fff; font-size: 24px; margin-bottom: 12px; font-weight: 800;">உங்கள் ஆன்லைன் கடைக்கு PayHere இணைக்க வேண்டுமா?</h3>
  <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto 20px; font-size: 15px;">
    Infinite Creative Web Design குழுவினர் உங்களுக்கு முழுமையான மின்-வணிக தளம் மற்றும் PayHere கட்டமைப்பு சேவைகளை வழங்க தயாராக உள்ளனர்.
  </p>
  <a href="https://wa.me/94789714912?text=வணக்கம்%20Infinite%20Creative!%20எனது%20இணையத்தளத்திற்கு%20PayHere%20கொடுப்பனவை%20இணைக்க%20விரும்புகிறேன்." 
     target="_blank" rel="noopener noreferrer" 
     style="display: inline-flex; align-items: center; gap: 8px; background: #04AA6D; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 800; text-decoration: none; font-size: 15px; box-shadow: 0 8px 24px rgba(4,170,109,0.35);">
    <span>💬 WhatsApp மூலம் ஆலோசனை பெறுங்கள்</span> &rarr;
  </a>
</div>
"""
    }
]

TEMPLATE = """<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https:; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <title>{title} | Infinite Creative</title>
  <meta name="description" content="{meta_desc}">
  <link rel="canonical" href="{canonical}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/main.css?v=2026">
  <link rel="icon" type="image/png" href="../images/logo.png">

  <style>
    body {{
      padding-top: 90px;
      font-family: {font_family};
      background: #080c16;
      color: #e2e8f0;
      line-height: 1.85;
    }}
    .article-post-wrapper {{
      max-width: 860px;
      margin: 0 auto;
      padding: 24px 20px 80px;
    }}
    .article-crumb {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #04AA6D;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 20px;
      text-decoration: none;
    }}
    .article-crumb:hover {{
      text-decoration: underline;
    }}
    .article-header {{
      margin-bottom: 32px;
    }}
    .article-cat-pill {{
      display: inline-block;
      background: rgba(4, 170, 109, 0.15);
      color: #04AA6D;
      border: 1px solid rgba(4, 170, 109, 0.3);
      padding: 4px 14px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }}
    .article-main-title {{
      font-size: clamp(26px, 4vw, 38px);
      font-weight: 800;
      line-height: 1.35;
      color: #ffffff;
      letter-spacing: -0.01em;
      margin-bottom: 18px;
    }}
    .article-meta-row {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      font-size: 13px;
      color: #94a3b8;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }}
    .article-hero-box {{
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 36px;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }}
    .article-hero-box img {{
      width: 100%;
      height: auto;
      max-height: 440px;
      object-fit: cover;
      display: block;
    }}
    .article-content h2 {{
      font-size: clamp(20px, 3vw, 26px);
      font-weight: 800;
      color: #ffffff;
      margin: 40px 0 16px;
      line-height: 1.4;
      border-left: 4px solid #04AA6D;
      padding-left: 14px;
    }}
    .article-content h3 {{
      font-size: 18px;
      font-weight: 700;
      color: #38bdf8;
      margin: 28px 0 12px;
    }}
    .article-content p {{
      margin-bottom: 20px;
      font-size: 16px;
      color: #cbd5e1;
    }}
    .article-content ul, .article-content ol {{
      margin: 0 0 24px 24px;
      color: #cbd5e1;
    }}
    .article-content li {{
      margin-bottom: 10px;
    }}
  </style>
</head>
<body>

  <!-- Universal Shared Header Container -->
  <div id="site-header-container"></div>

  <!-- ARTICLE CONTENT WRAPPER -->
  <main class="article-post-wrapper">
    <a href="../blogs.html" class="article-crumb">&larr; {back_text}</a>

    <header class="article-header">
      <span class="article-cat-pill">{category}</span>
      <h1 class="article-main-title">{title}</h1>
      <div class="article-meta-row">
        <span>✍️ <strong>Infinite Technical Editorial</strong></span>
        <span>📅 {date}</span>
        <span>⏱️ {read_time}</span>
        <span style="color:#04AA6D;font-weight:700;">● {badge_text}</span>
      </div>
    </header>

    <div class="article-hero-box">
      <img src="{hero_img}" alt="{hero_alt}" width="860" height="440" loading="eager" decoding="async">
    </div>

    <article class="article-content">
      {content_html}
    </article>
  </main>

  <!-- Universal Shared Footer Container -->
  <div id="site-footer-container"></div>

  <script src="../js/components.js" defer></script>
</body>
</html>"""

def build_articles():
    os.makedirs(ARTICLE_DIR, exist_ok=True)
    count = 0

    for a in ARTICLES:
        lang = a["lang"]
        font_family = "'Noto Sans Sinhala', 'Inter', sans-serif" if lang == 'si' else "'Noto Sans Tamil', 'Inter', sans-serif"
        back_text = "සියලුම ලිපි වෙත (All Articles)" if lang == 'si' else "அனைத்து கட்டுரைகளுக்கும் (All Articles)"
        badge_text = "සත්‍යාපිත තාක්ෂණික ලිපියකි (Verified Technical Guide)" if lang == 'si' else "சரிபார்க்கப்பட்ட வழிகாட்டி (Verified Technical Guide)"

        html = TEMPLATE.format(
            lang=lang,
            title=a["title"],
            meta_desc=a["meta_desc"],
            canonical=a["canonical"],
            font_family=font_family,
            category=a["category"],
            read_time=a["read_time"],
            date=a["date"],
            badge_text=badge_text,
            hero_img=a["hero_img"],
            hero_alt=a["hero_alt"],
            content_html=a["content_html"],
            back_text=back_text
        )

        out_path = os.path.join(ARTICLE_DIR, a["filename"])
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html)
        count += 1
        print(f"Generated {a['filename']} ({lang}) - UTF-8 Clean")

    print(f"\nSuccessfully generated {count} multilingual articles.")

if __name__ == '__main__':
    build_articles()
