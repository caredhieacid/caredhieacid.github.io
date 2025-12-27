import pypdf
import os
import sys

# Set encoding to utf-8 for stdout/stderr just in case
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "龙芯中科-莫胜杰简历.pdf"
output_path = "resume_content.txt"

try:
    print(f"Attempting to read: {pdf_path}")
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        print(f"Reading page {i+1}")
        text += page.extract_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Success: Text extracted to resume_content.txt")
except Exception as e:
    print(f"Error: {e}")
