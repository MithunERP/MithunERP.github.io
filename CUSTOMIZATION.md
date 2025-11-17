# MithunERP Website - Customization Guide

## Quick Start

Your professional MithunERP website is ready! Here's how to customize it for your business.

## Essential Updates

### 1. Contact Information
**File**: `index.html` (Lines 310-335)

Update these fields with your actual business details:
- Phone number
- Email address
- Business address
- City and country

### 2. Service Descriptions
**File**: `index.html` (Lines 150-195)

Update the service descriptions and add your specific offerings. The current 6 services are:
- ERP Solutions
- Custom Software Development
- Business Analytics
- System Security
- System Integration
- 24/7 Support

### 3. Company Statistics
**File**: `index.html` (Lines 125-145)

Customize the "About" section statistics:
- Number of clients served
- Years of experience
- Client satisfaction percentage

### 4. Social Media Links
**File**: `index.html` (Lines 381-387)

Update the social media links in the footer to point to your actual profiles.

## Color Customization

### Changing the Theme Color
**File**: `styles.css` (Lines 1-18)

Edit the CSS variables to change colors:

```css
:root {
    --bottle-green: #2d5016;    /* Primary color */
    --light-green: #3d6b1f;     /* Secondary color */
    --accent-gold: #d4af37;     /* Accent color */
}
```

### Popular Color Alternatives

**Professional Blue Theme**:
```css
--bottle-green: #1a3a52;    /* Dark blue */
--light-green: #2c5aa0;     /* Light blue */
--accent-gold: #e8a600;     /* Gold accent */
```

**Corporate Red Theme**:
```css
--bottle-green: #8b0000;    /* Dark red */
--light-green: #c41e3a;     /* Red */
--accent-gold: #ffd700;     /* Gold accent */
```

## Advanced Customization

### Add New Services
1. Find the Services section in `index.html` (around line 150)
2. Copy this template:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Your service description here.</p>
</div>
```
3. Replace `fa-icon-name` with an icon from [Font Awesome](https://fontawesome.com/icons)
4. Update the title and description

### Add Navigation Menu Items
1. Find the nav-menu in `index.html` (around line 25)
2. Add a new menu item:
```html
<li><a href="#section-id">New Page</a></li>
```
3. Create a corresponding section with `id="section-id"`

### Add New Sections
1. Add a new HTML section before the footer
2. Style it using CSS classes (follow the existing pattern)
3. Add the section ID to the navigation menu

## Logo Customization

### Replace Logo Text with Image
Replace this:
```html
<div class="logo">
    <h1>MithunERP</h1>
</div>
```

With this:
```html
<div class="logo">
    <img src="path/to/your/logo.png" alt="MithunERP" height="50">
</div>
```

Then add this CSS to `styles.css`:
```css
.logo img {
    height: 50px;
    width: auto;
}
```

## Chatbot Integration

### Integrate Dialogflow Chatbot

Add this code before the closing `</body>` tag in `index.html`:

```html
<!-- Dialogflow Messenger -->
<script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=2"></script>
<df-messenger
    intent="WELCOME"
    chat-title="MithunERP Support"
    agent-id="YOUR_AGENT_ID"
    language-code="en"
></df-messenger>
```

### Integrate Intercom Chatbot

Add this before the closing `</body>` tag:

```html
<script>
  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: "YOUR_APP_ID"
  };
</script>
<script async id="IntercomScript">
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.c=function(args){args.unshift('intercomSettings');ic(...args);};i.s=function(prop){return eval('_='+prop)};i.p=function(prop){prop=prop.split('.');return i.s('window.'+prop[0]).then(function(){return eval(prop.join('.'))})};i.onintent=window.Intercom;w.Intercom=i;var l={onload:function fn(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}};if(w.attachEvent){w.attachEvent('onload',l.onload);}else{w.addEventListener('load',l.onload,false);}}})();
</script>
```

## Performance Optimization

### Add Google Analytics

Add before the closing `</head>` tag:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_YOUR_ID');
</script>
```

### Add Favicons

Add these links in the `<head>` section:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

## Mobile Optimization Tips

1. **Test on real devices** - Use Chrome DevTools mobile emulator
2. **Check touch targets** - Buttons should be at least 48x48px
3. **Test navigation** - Make sure hamburger menu works smoothly
4. **Optimize images** - Use compressed, responsive images
5. **Monitor performance** - Use Google PageSpeed Insights

## SEO Best Practices

1. **Update Meta Tags** in `index.html`:
```html
<meta name="description" content="Your unique description">
<meta name="keywords" content="your, keywords, here">
```

2. **Add Structured Data** (Schema.org):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MithunERP",
  "url": "https://mithun-erp.com",
  "description": "Professional ERP Solutions"
}
</script>
```

3. **Update Open Graph Tags** for social sharing:
```html
<meta property="og:title" content="MithunERP">
<meta property="og:description" content="Professional ERP Solutions">
<meta property="og:image" content="path/to/image.jpg">
```

## Backup & Version Control

1. **Commit changes regularly**:
```bash
git add .
git commit -m "Update: Added new service and contact info"
git push origin main
```

2. **Create backups** before major changes

## Testing Checklist

- [ ] Test on mobile devices (iOS and Android)
- [ ] Test on different browsers
- [ ] Verify all links work
- [ ] Check contact form validation
- [ ] Test hamburger menu
- [ ] Verify responsive behavior
- [ ] Check loading speed
- [ ] Validate HTML/CSS with W3C validators
- [ ] Test accessibility with screen readers
- [ ] Verify meta tags and SEO

## Common Issues & Solutions

### Menu not closing on mobile
Ensure the JavaScript is loaded: `<script src="script.js"></script>`

### Styling not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path in HTML
- Verify CSS syntax

### Form not working
- Check browser console for JavaScript errors
- Verify form structure in HTML
- Test in different browsers

### Images not showing
- Verify image paths are correct
- Use absolute or relative paths consistently
- Check file permissions

## Getting Help

1. Check the code comments (detailed in each file)
2. Review the README.md for overview
3. Check Font Awesome docs for icon names
4. Use browser DevTools for debugging

## Important Notes

⚠️ **Remember to update**:
- Contact information (phone, email, address)
- Company name if different from MithunERP
- Service descriptions
- Social media links
- Years of experience
- Number of clients

📱 **Test responsiveness** at these breakpoints:
- Desktop: 1920px
- Tablet: 768px
- Mobile: 375px

---

**Need more help?** Review the inline code comments and refer to the main README.md file.
