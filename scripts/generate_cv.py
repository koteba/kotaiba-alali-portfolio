"""Generates a placeholder CV PDF at public/cv.pdf.
Replace this file any time with a real, designed CV export — the site
only expects a file to exist at that exact path and downloads it as-is.
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

INK = HexColor('#0A0A12')
MUTED = HexColor('#5B5B6B')
VIOLET = HexColor('#635BFF')
AMBER = HexColor('#D4A24C')

styles = getSampleStyleSheet()
name_style = ParagraphStyle('Name', parent=styles['Title'], textColor=INK, fontSize=24, spaceAfter=2, alignment=TA_LEFT)
title_style = ParagraphStyle('TitleLine', parent=styles['Normal'], textColor=VIOLET, fontSize=12, spaceAfter=10)
section_style = ParagraphStyle('Section', parent=styles['Heading2'], textColor=INK, fontSize=12, spaceBefore=14, spaceAfter=6, borderColor=AMBER)
body_style = ParagraphStyle('Body', parent=styles['Normal'], textColor=INK, fontSize=9.5, leading=14)
muted_style = ParagraphStyle('Muted', parent=styles['Normal'], textColor=MUTED, fontSize=9.5, leading=14)

doc = SimpleDocTemplate('public/cv.pdf', pagesize=letter,
                         leftMargin=0.75*inch, rightMargin=0.75*inch,
                         topMargin=0.7*inch, bottomMargin=0.7*inch,
                         title='Kotaiba Alali — CV', author='Kotaiba Alali')

story = []
story.append(Paragraph('Kotaiba Alali', name_style))
story.append(Paragraph('Full Stack Developer &amp; Business Analyst — Bridging Technology &amp; Business', title_style))
story.append(Paragraph(
    'Damascus, Syria (open to relocation) &nbsp;|&nbsp; koteba.ali98@gmail.com &nbsp;|&nbsp; '
    '+963 937 022 083 &nbsp;|&nbsp; github.com/kotaiba-alali &nbsp;|&nbsp; linkedin.com/in/kotaiba-alali', muted_style))

story.append(Paragraph('PROFILE', section_style))
story.append(Paragraph(
    "Full-stack developer and business analyst with 3+ years of experience shipping production web "
    "systems end to end — from stakeholder interviews and requirements documents through to deployed, "
    "monitored code. Currently completing a Master's in Web Science (2026).", body_style))

story.append(Paragraph('EXPERIENCE', section_style))
story.append(Paragraph('Full Stack Developer &amp; Business Analyst — FrontierTech', ParagraphStyle('role', parent=body_style, fontSize=10.5, textColor=INK, spaceBefore=4)))
story.append(Paragraph('Damascus, Syria &nbsp;|&nbsp; Oct 2022 – Sep 2025', muted_style))
for line in [
    'Maintained 99.9% uptime across production services through proactive monitoring and incident response.',
    'Grew organic traffic by 35% by leading SEO-focused technical improvements and content structure work.',
    'Cut operational overhead by 18% by automating recurring manual workflows and reporting.',
    'Led Agile ceremonies for a cross-functional team, translating business requirements into sprint-ready user stories.',
]:
    story.append(Paragraph(f'• {line}', body_style))

story.append(Paragraph('SELECTED PROJECTS', section_style))
for proj, desc in [
    ('Warehouse Management System', 'Real-time inventory, stock level, and order-fulfillment tracking system. React, Node.js, MySQL.'),
    ('Job Vacancy Management (Ministry)', 'Government platform for publishing vacancies and routing candidates through a structured review pipeline. PHP, MySQL.'),
    ('Daleel Syria', 'Public directory platform connecting users to services and businesses; 1,000+ active users. Next.js, TypeScript, PostgreSQL.'),
]:
    story.append(Paragraph(f'<b>{proj}</b> — {desc}', body_style))

story.append(Paragraph('SKILLS', section_style))
skills_table_data = [
    ['Development', 'JavaScript/TypeScript, React, Next.js, Node.js, PHP (OOP), HTML/CSS, Tailwind'],
    ['Databases', 'MySQL, PostgreSQL, MongoDB, Redis'],
    ['Business Analysis', 'Requirements gathering, process mapping, stakeholder management, user stories'],
    ['Tools & Methods', 'Git/GitHub, Jira/Confluence, Agile/Scrum, Docker'],
]
t = Table(skills_table_data, colWidths=[1.5*inch, 4.5*inch])
t.setStyle(TableStyle([
    ('FONTSIZE', (0, 0), (-1, -1), 9.5),
    ('TEXTCOLOR', (0, 0), (0, -1), VIOLET),
    ('TEXTCOLOR', (1, 0), (1, -1), INK),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
]))
story.append(t)

story.append(Paragraph('CERTIFICATIONS', section_style))
story.append(Paragraph(
    'Google Agile Project Management (2023) · GitHub Foundations (2023) · '
    'PHP Object-Oriented Programming (2022) · Jira Fundamentals (2023)', body_style))

story.append(Paragraph('EDUCATION', section_style))
story.append(Paragraph("Master's in Web Science — expected 2026", body_style))

story.append(Paragraph('LANGUAGES', section_style))
story.append(Paragraph('Arabic (Native) · English (B1) · German (A1)', body_style))

doc.build(story)
print('Wrote public/cv.pdf')
