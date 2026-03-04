# Sentiê Agenda (Next.js + Tailwind)

Sistema simples de agendamento para salão, mobile-first, com fluxo em páginas separadas.

## Funcionalidades

### Cliente
- `/book/service`: seleção de serviço
- `/book/professional`: seleção de profissional
- `/book/calendar`: calendário com horários disponíveis
- `/book/details`: formulário com nome completo + WhatsApp
- `/book/success`: confirmação com botões de Google Agenda e WhatsApp

### Admin
- `/admin/login`: autenticação por senha (`ADMIN_PASSWORD`)
- `/admin`: visualização da agenda por dia

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Persistência com JSON local (`data/*.json`)

## Executar localmente
```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Estrutura
```txt
app/
  page.tsx
  book/
    service/page.tsx
    professional/page.tsx
    calendar/page.tsx
    details/page.tsx
    success/page.tsx
  admin/
    login/page.tsx
    page.tsx
  api/
components/
lib/
data/
public/
```
