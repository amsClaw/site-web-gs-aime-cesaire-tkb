# Guide de création des comptes techniques

Ce document liste les comptes à créer et les tokens à récupérer pour donner à l'agent IA un accès à un email et à Facebook.

Tout est gratuit.

---

## 1. Compte Gmail dédié pour l'agent

**Objectif :** l'agent envoie des emails depuis cette adresse.

### Création du compte

1. Aller sur https://accounts.google.com/signup
2. Créer un compte avec le nom de l'agent
   - Exemple : `amsclaw.agent@gmail.com` ou ce que tu veux
3. Google demande un numéro de téléphone pour vérification → à faire toi-même
4. Une fois créé, ne pas fermer la session

### Mot de passe d'application (SMTP)

Nécessaire pour que l'agent puisse envoyer des emails sans OAuth complexe.

1. Activer la **Validation en 2 étapes** sur le compte Google
   - https://myaccount.google.com/security → Validation en 2 étapes
2. Une fois la 2FA activée, aller dans :
   - https://myaccount.google.com/apppasswords
3. Créer un mot de passe d'application :
   - Sélectionner l'application : **Mail**
   - Sélectionner l'appareil : **Autre** (saisir "OpenClaw Agent")
4. Google affiche un mot de passe de 16 caractères (ex: `abcd efgh ijkl mnop`)
5. **Le copier immédiatement** et le stocker dans un endroit sécurisé

### Configuration dans OpenClaw

Ce mot de passe permet à l'agent d'envoyer des emails via SMTP.

Exemple de configuration attendue (à adapter) :
- Serveur SMTP : `smtp.gmail.com`
- Port : `587`
- Utilisateur : `amsclaw.agent@gmail.com`
- Mot de passe : le mot de passe d'application
- Sécurité : STARTTLS

### Alternative : API Gmail (plus robuste mais plus longue à configurer)

Si les mots de passe d'application ne suffisent pas :

1. Aller sur https://console.cloud.google.com
2. Créer un nouveau projet
3. Activer Gmail API
4. Créer des identifiants OAuth 2.0
5. Télécharger le fichier JSON des credentials
6. Générer un refresh token via un script local
7. Stocker les tokens dans la config OpenClaw

---

## 2. Page Facebook

**Objectif :** page où l'agent publiera les posts de sensibilisation.

### Création

1. Sur Facebook, cliquer sur ton **avatar** en haut à droite
2. Sélectionner **Pages** → **Créer une Page**
3. Saisir le nom de la page :
   - Exemple : *Sensibilisation Code de la route & Civisme Guinée*
4. Choisir la catégorie : **Éducation** ou **Communauté**
5. Description : phrase d'accroche
6. Ajouter une photo de profil et une bannière
7. Publier la page

**Important :** Créer la page depuis un compte Facebook personnel. La page doit avoir un nom stable car elle sera liée à l'application Facebook Developer.

---

## 3. Application Facebook Developer

**Objectif :** obtenir les tokens API qui permettront à l'agent de publier automatiquement sur la page.

C'est la partie la plus technique.

### Étapes

1. Aller sur https://developers.facebook.com
2. Se connecter avec ton compte personnel Facebook
3. Cliquer sur **Mes applications** → **Créer une application**
4. Choisir le type : **Business** ou **Consommateur**
   - Pour une page perso : **Consommateur**
5. Saisir un nom d'application (ex: `Agent Civisme Guinée`)
6. Email de contact : l'adresse du compte Gmail dédié
7. Valider la création (captcha possible)

### Configuration des produits

1. Dans le tableau de bord de l'app, ajouter le produit **Facebook Login**
   - Déroulant → **Facebook Login** → Configurer
   - Choisir l'option la plus simple (pas de login web)
   - Pas besoin de saisie d'URL de redirection pour une V1

2. Ajouter le produit **Pages API** (ou **Facebook Pages**)
   - Dans "Ajouter un produit", chercher **Pages** et ajouter

### Génération du Page Access Token

1. Dans l'app, aller dans **Outils** → **Graph API Explorer**
2. Sélectionner l'application créée
3. Token : **Page Access Token**
4. Permissions (scopes) à sélectionner :
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
5. Cliquer sur **Générer un token**
6. Facebook demande de confirmer → sélectionner ta Page
7. Le token s'affiche

### Token longue durée

Le token de base expire au bout de ~1-2 heures. Pour un token de 60 jours :

1. Dans Graph API Explorer, cliquer sur le token → **Information sur le jeton**
2. Copier le `access_token` court
3. Utiliser cet endpoint (à exécuter une fois) :

```
GET https://graph.facebook.com/v21.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id={APP_ID}
  &client_secret={APP_SECRET}
  &fb_exchange_token={SHORT_LIVED_TOKEN}
```

Où :
- `APP_ID` : trouvable dans le tableau de bord de l'app (Settings → Basic)
- `APP_SECRET` : trouvable dans Settings → Basic → App Secret (cliquer pour révéler)
- `SHORT_LIVED_TOKEN` : le token obtenu dans Graph API Explorer

### Renouvellement

Le token expire après **60 jours**. Prévoir un rappel pour le renouveler :
- Soit via une interface Facebook
- Soit en régénérant un nouveau token long-lived
- Soit en automatisant l'échange via l'API

---

## 4. Alternative : SendGrid (email, si Gmail ne suffit pas)

**Si** tu préfères ne pas utiliser Gmail :

1. Aller sur https://signup.sendgrid.com
2. Créer un compte gratuit (100 emails/jour)
3. Valider un expéditeur (Sender Authentication → Domain ou Single Sender)
4. Créer une clé API dans Settings → API Keys
5. Utiliser cette clé dans la config de l'agent

---

## 5. Alternative : Mailgun (email)

1. Aller sur https://www.mailgun.com
2. Créer un compte gratuit (~1000 emails/mois)
3. Valider un expéditeur
4. Récupérer la clé API
5. Idem SendGrid, utiliser dans la config

---

## Récapitulatif des tokens et clés à sécuriser

| Élément | Emplacement | Durée de vie |
|---|---|---|
| Mot de passe d'application Gmail | Google Account → App Passwords | Illimité (révocable) |
| Facebook App ID | developers.facebook.com → App Dashboard | Illimité |
| Facebook App Secret | developers.facebook.com → Settings | Illimité (visible seulement au moment de la création) |
| Page Access Token (court) | Graph API Explorer | ~1-2 heures |
| Page Access Token (long) | Échange via API | 60 jours |
| Clé API SendGrid (optionnel) | SendGrid → Settings → API Keys | Illimité |
| Clé API Mailgun (optionnel) | Mailgun Dashboard | Illimité (révocable) |

**Règle :** ne jamais partager ces tokens. Les stocker uniquement dans la config OpenClaw ou dans un fichier `.env` local.

## Prochaine étape

Quand tu décideras de lancer le projet :
1. Créer le compte Gmail dédié (besoin de toi pour la vérification téléphonique)
2. Je te guiderai pour la création de l'app Facebook Developer et la génération du token
