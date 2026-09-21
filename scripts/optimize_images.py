import os
from PIL import Image

IMG_DIR = "images"
variants = {
    "logo": [
        (100, 100, "logo-100w.webp"),
        (200, 200, "logo-200w.webp"),
    ],
    "blog_1": [
        (480, 480, "blog_1-480w.webp"),
        (800, 800, "blog_1-800w.webp"),
    ],
    "blog_2": [
        (480, 480, "blog_2-480w.webp"),
        (800, 800, "blog_2-800w.webp"),
    ],
    "blog_3": [
        (480, 480, "blog_3-480w.webp"),
        (800, 800, "blog_3-800w.webp"),
    ]
}

source_map = {
    "logo": os.path.join(IMG_DIR, "logo.png"),
    "blog_1": os.path.join(IMG_DIR, "blog_1.webp"),
    "blog_2": os.path.join(IMG_DIR, "blog_2.webp"),
    "blog_3": os.path.join(IMG_DIR, "blog_3.webp")
}

for name, var_list in variants.items():
    src_path = source_map[name]
    with Image.open(src_path) as img:
        for w, h, fname in var_list:
            out_path = os.path.join(IMG_DIR, fname)
            resized = img.resize((w, h), Image.Resampling.LANCZOS)
            resized.save(out_path, "WEBP", quality=85, method=6)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"Generated {fname:20}: {w}x{h} ({size_kb:.1f} KB)")
