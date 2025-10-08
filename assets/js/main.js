document.addEventListener('DOMContentLoaded', function() {
    const domainInput = document.getElementById('domainInput');
    const dorkCards = document.querySelectorAll('.dork-card');
    const notification = document.getElementById('notification');
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeToggleText');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const fileSearchBtn = document.querySelector('#filesTab .file-search-btn');
    const urlSearchBtn = document.querySelector('#urlTab .url-search-btn');
    const fileOptions = document.querySelectorAll('#filesTab .file-option input');
    const urlOptions = document.querySelectorAll('#urlTab .file-option input');
    const githubSearchBtn = document.querySelector('#githubTab .github-search-btn');
    const yahooSearchBtn = document.querySelector('#yahooTab .yahoo-search-btn');
    const githubOptions = document.querySelectorAll('#githubTab .file-option input');
    const yahooOptions = document.querySelectorAll('#yahooTab .file-option input');
    const filesAfterInput = document.getElementById('filesAfter');
    const filesBeforeInput = document.getElementById('filesBefore');
    const customUrlPattern = document.getElementById('customUrlPattern');
    const opAllInText = document.getElementById('opAllInText');
    const opInText = document.getElementById('opInText');
    const opInUrl = document.getElementById('opInUrl');
    const opAllInUrl = document.getElementById('opAllInUrl');
    const opInTitle = document.getElementById('opInTitle');
    const opAllInTitle = document.getElementById('opAllInTitle');
    const opLink = document.getElementById('opLink');
    const root = document.documentElement;
    let mouseMoveRaf = null;

    const updateGlowPosition = (event) => {
        if (mouseMoveRaf) {
            return;
        }
        mouseMoveRaf = requestAnimationFrame(() => {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            root.style.setProperty('--cursor-x', `${x}%`);
            root.style.setProperty('--cursor-y', `${y}%`);
            mouseMoveRaf = null;
        });
    };

    window.addEventListener('mousemove', updateGlowPosition);
    window.addEventListener('mouseout', (event) => {
        if (!event.relatedTarget && !event.toElement) {
            root.style.setProperty('--cursor-x', '50%');
            root.style.setProperty('--cursor-y', '50%');
        }
    });

    tabPanels.forEach((panel) => {
        panel.toggleAttribute('hidden', !panel.classList.contains('active'));
    });

    tabButtons.forEach((button) => {
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
    });

    const dorks = {
        contactForm: [
            'intitle:"contact.php"',
            'intitle:"contactus"',
            'intitle:"contactus.php"',
            'intitle:"contactus.aspx"',
            'intitle:"contactus.asp"',
            'intitle:"contactus.html"',
            'intitle:"contact-us.html"',
            'intitle:"contact_us.html"',
            'intitle:"contact.html"'
        ],
        contactPage: [
            'inurl:"contact.php"',
            'inurl:"contactus"',
            'inurl:"contactus.php"',
            'inurl:"contactus.aspx"',
            'inurl:"contactus.asp"',
            'inurl:"contactus.html"',
            'inurl:"contact-us.html"',
            'inurl:"contact_us.html"',
            'inurl:"contact.html"'
        ],
        feedbackForm: [
            'inurl:"feedback.php"',
            'inurl:"send feedback"',
            'inurl:"feedbackus.php"',
            'inurl:"feedback.aspx"',
            'inurl:"feedback.asp"',
            'inurl:"feedback.html"',
            'intitle:"send feedback"'
        ],
        submitRequest: [
            'inurl:"Send Us a Message"',
            'intitle:"Send Us a Message"'
        ],
        contactSupport: [
            'intitle:"support.php"',
            'intitle:"support"',
            'intitle:"contactus.php"',
            'intitle:"support.aspx"',
            'intitle:"support.asp"',
            'intitle:"support.html"',
            'intitle:"support-us.html"'
        ],
        submitPages: [
            'inurl:"submit messages"',
            'inurl:"submit"',
            'inurl:"submit form"',
            'intitle:"submit form"'
        ],
        supportCenter: [
            'inurl:"Support Center"',
            'intitle:"Support Center"'
        ],
        submitForms: [
            'intitle:"submit.php"',
            'intitle:"submit"',
            'intitle:"submit.aspx"',
            'intitle:"submit.asp"',
            'intitle:"submit.html"',
            'intitle:"submit-us.html"',
            'intitle:"submit_us.html"'
        ],
        requestSubmit: [
            'inurl:"submit a request"',
            'intitle:"submit a request"'
        ],
        reportPages: [
            'inurl:"submit a report"',
            'intitle:"submit a report"'
        ],
        formPages: [
            'intext:"Attachments (optional)"'
        ],
        requestTypeForms: [
            'inurl:"request-form"',
            'inurl:"submit-a-request"',
            'inurl:"request-form.aspx"',
            'inurl:"request.php"',
            'intitle:"request form"'
        ],
        jobApplication: [
            'intitle:"job application"',
            'intitle:"careers"',
            'intitle:"apply now"',
            'inurl:"job"',
            'inurl:"career"',
            'inurl:"apply"'
        ],
        newsletterSubscription: [
            'intitle:"newsletter"',
            'intitle:"subscribe"',
            'inurl:"newsletter"',
            'inurl:"subscribe"'
        ],
        supportTickets: [
            'intitle:"support ticket"',
            'intitle:"create ticket"',
            'inurl:"ticket"',
            'inurl:"support"'
        ],
        reportAbuse: [
            'intitle:"report abuse"',
            'intitle:"report"',
            'inurl:"report"',
            'inurl:"abuse"'
        ],
        testimonialSubmission: [
            'intitle:"testimonial"',
            'intitle:"submit testimonial"',
            'inurl:"testimonial"',
            'inurl:"review"'
        ],
        askQuestion: [
            'intitle:"ask a question"',
            'intitle:"question"',
            'inurl:"question"',
            'inurl:"ask"'
        ],
        requestCallback: [
            'intitle:"request a callback"',
            'intitle:"callback"',
            'inurl:"callback"',
            'inurl:"call"'
        ],
        bugReport: [
            'intitle:"bug report"',
            'intitle:"report bug"',
            'inurl:"bug"',
            'inurl:"report"'
        ],
        suggestionBox: [
            'intitle:"suggestion"',
            'intitle:"feedback"',
            'inurl:"suggestion"',
            'inurl:"idea"'
        ],
        registrationForms: [
            'intitle:"register"',
            'intitle:"sign up"',
            'inurl:"register"',
            'inurl:"signup"'
        ],
        quoteRequest: [
            'intitle:"quote request"',
            'intitle:"get a quote"',
            'inurl:"quote"',
            'inurl:"request"'
        ],
        reviewSubmission: [
            'intitle:"write a review"',
            'intitle:"review"',
            'inurl:"review"',
            'inurl:"rating"'
        ]
    };

    const fileDorks = {
        pdf: ['filetype:pdf'],
        excel: ['filetype:xls', 'filetype:xlsx'],
        docx: ['filetype:doc', 'filetype:docx'],
        env: ['inurl:.env', 'ext:env', '"APP_KEY"', '"DB_PASSWORD"'],
        csv: ['filetype:csv'],
        log: ['filetype:log', 'inurl:.log'],
        other: ['filetype:sql', 'filetype:json', 'filetype:conf', 'inurl:backup', 'inurl:credentials']
    };

    const urlDorks = {
        admin: ['inurl:admin', 'inurl:dashboard', 'inurl:controlpanel'],
        login: ['inurl:login', 'inurl:signin', 'intitle:"login"'],
        backup: ['inurl:backup', 'inurl:bak', 'filetype:zip'],
        config: ['inurl:config', 'filetype:ini', 'filetype:conf'],
        staging: ['inurl:staging', 'inurl:preprod', 'site:staging.{domain}'],
        test: ['inurl:test', 'inurl:qa', 'intitle:"test"'],
        upload: ['inurl:upload', 'inurl:fileupload', 'intitle:"upload"']
    };

    const githubDorks = {
        envSecrets: ['filename:.env', 'path:**/.env', '"SECRET_KEY"', '"APP_KEY"', '"DATABASE_URL"'],
        apiTokens: ['"api_key"', '"apiKey"', '"access_token"', '"bearer"', 'filename:config'],
        databaseCreds: ['"DB_PASSWORD"', '"db_password"', '"connectionString"', '"jdbc:"'],
        cloudKeys: ['"AWS_ACCESS_KEY_ID"', '"AWS_SECRET_ACCESS_KEY"', '"gcloud auth"', '"AZURE_STORAGE_KEY"'],
        configFiles: ['filename:config', 'filename:settings', 'extension:yml', 'extension:yaml', 'extension:json'],
        deployment: ['filename:Dockerfile', 'filename:docker-compose.yml', '"CI_SECRET"', '"kubeconfig"']
    };

    const yahooDorks = {
        exposedDocs: ['filetype:pdf', 'filetype:xls', 'filetype:xlsx', 'filetype:doc', 'filetype:docx', 'filetype:ppt'],
        indexPages: ['intitle:"index of"', 'intitle:"directory listing"'],
        loginPortals: ['inurl:login', 'inurl:signin', 'intitle:"login"'],
        errorLogs: ['intext:"error"', 'intext:"exception"', 'inurl:error'],
        backups: ['inurl:backup', 'filetype:bak', 'filetype:sql', 'filetype:gz'],
        dashboards: ['intitle:dashboard', 'intitle:"admin panel"', 'inurl:dashboard']
    };

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            if (themeLabel) {
                themeLabel.textContent = 'Light Mode';
            }
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            if (themeLabel) {
                themeLabel.textContent = 'Dark Mode';
            }
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function getCleanDomain() {
        const rawDomain = domainInput.value.trim();
        if (!rawDomain) {
            showNotification('Please enter a domain', 'error');
            return null;
        }

        let cleanDomain = rawDomain;
        if (cleanDomain.startsWith('http://')) cleanDomain = cleanDomain.substring(7);
        if (cleanDomain.startsWith('https://')) cleanDomain = cleanDomain.substring(8);
        if (cleanDomain.startsWith('www.')) cleanDomain = cleanDomain.substring(4);
        if (cleanDomain.endsWith('/')) cleanDomain = cleanDomain.slice(0, -1);

        return cleanDomain;
    }

    function buildLogicQuery(domain, patterns = [], extras = []) {
        const baseTokens = [`site:${domain}`];
        const uniquePatterns = [...new Set((patterns || []).map((pattern) => pattern.trim()).filter(Boolean))];
        const uniqueExtras = [...new Set((extras || []).map((extra) => extra.trim()).filter(Boolean))];
        const orTokens = [...uniquePatterns, ...uniqueExtras];

        if (orTokens.length === 1) {
            baseTokens.push(orTokens[0]);
        } else if (orTokens.length > 1) {
            baseTokens.push(`(${orTokens.join(' | ')})`);
        }

        return baseTokens.join(' & ');
    }

    function executeDorkSearch(dorkType) {
        const cleanDomain = getCleanDomain();
        if (!cleanDomain) {
            return;
        }

        const patterns = dorks[dorkType];
        if (!patterns) {
            showNotification('No dork pattern found for this card', 'error');
            return;
        }

        const query = buildLogicQuery(cleanDomain, patterns);
        if (!query) {
            showNotification('Unable to build search query', 'error');
            return;
        }

        const encodedDork = encodeURIComponent(query);
        const searchUrl = `https://www.google.com/search?q=${encodedDork}`;
        window.open(searchUrl, '_blank');
        showNotification('Search executed successfully!');
    }

    function executeFileSearch() {
        const cleanDomain = getCleanDomain();
        if (!cleanDomain) {
            return;
        }

        const selectedTypes = Array.from(fileOptions)
            .filter((option) => option.checked)
            .map((option) => option.value);

        if (!selectedTypes.length) {
            showNotification('Select at least one file type', 'error');
            return;
        }

        const segments = [];
        selectedTypes.forEach((type) => {
            const patterns = fileDorks[type];
            if (patterns && patterns.length) {
                segments.push(...patterns);
            }
        });

        const extras = [];
        const afterValue = filesAfterInput?.value;
        const beforeValue = filesBeforeInput?.value;

        if (afterValue && beforeValue && afterValue > beforeValue) {
            showNotification('After date must be before the before date', 'error');
            return;
        }

        if (afterValue) {
            extras.push(`after:${afterValue}`);
        }

        if (beforeValue) {
            extras.push(`before:${beforeValue}`);
        }

        const query = buildLogicQuery(cleanDomain, segments, extras);
        if (!query) {
            showNotification('No dorks available for the selected types', 'error');
            return;
        }

        const encodedDork = encodeURIComponent(query);
        const searchUrl = `https://www.google.com/search?q=${encodedDork}`;
        window.open(searchUrl, '_blank');
        showNotification('File search executed successfully!');
    }

    function executeUrlSearch() {
        const cleanDomain = getCleanDomain();
        if (!cleanDomain) {
            return;
        }

        const segments = [];

        const selectedTypes = Array.from(urlOptions)
            .filter((option) => option.checked)
            .map((option) => option.value);

        selectedTypes.forEach((type) => {
            const patterns = urlDorks[type];
            if (patterns && patterns.length) {
                const replacedPatterns = patterns.map((pattern) => pattern.replace('{domain}', cleanDomain));
                segments.push(...replacedPatterns);
            }
        });

        const extras = [];

        const addOperator = (prefix, input, useQuotes = false, allMode = false) => {
            const value = input?.value.trim();
            if (!value) {
                return;
            }

            if (allMode) {
                extras.push(`${prefix}:"${value.replace(/"/g, '')}"`);
                return;
            }

            const tokens = value.split(/\s+/).filter(Boolean);
            if (!tokens.length) {
                return;
            }

            const sanitizedTokens = tokens.map((token) => token.replace(/"/g, ''));
            const singleFormatted = sanitizedTokens[0];

            if (sanitizedTokens.length === 1) {
                const value = useQuotes ? `"${singleFormatted}"` : singleFormatted;
                extras.push(`${prefix}:${value}`);
                return;
            }

            const formattedTokens = sanitizedTokens.map((sanitized) => (useQuotes ? `"${sanitized}"` : sanitized));
            // Wrap the token list so the operator matches any provided keyword.
            extras.push(`${prefix}:(${formattedTokens.join(' | ')})`);
        };

        addOperator('allintext', opAllInText, true, true);
        addOperator('intext', opInText, true, false);
        addOperator('inurl', opInUrl, false, false);
        addOperator('allinurl', opAllInUrl, false, true);
        addOperator('intitle', opInTitle, true, false);
        addOperator('allintitle', opAllInTitle, true, true);
        addOperator('link', opLink, false, false);

        const customPattern = customUrlPattern?.value.trim();
        if (customPattern) {
            const sanitized = customPattern.replace(/\s+/g, '');
            if (sanitized.length) {
                extras.push(`inurl:${sanitized}`);
            }
        }

        if (!segments.length && !extras.length) {
            showNotification('Provide operator keywords or custom inurl value', 'error');
            return;
        }

        const query = buildLogicQuery(cleanDomain, segments, extras);
        if (!query) {
            showNotification('Unable to build search query', 'error');
            return;
        }

        const encodedDork = encodeURIComponent(query);
        const searchUrl = `https://www.google.com/search?q=${encodedDork}`;
        window.open(searchUrl, '_blank');
        showNotification('URL search executed successfully!');
    }

    function executeGithubSearch() {
        const cleanDomain = getCleanDomain();
        if (!cleanDomain) {
            return;
        }

        const selectedTypes = Array.from(githubOptions)
            .filter((option) => option.checked)
            .map((option) => option.value);

        if (!selectedTypes.length) {
            showNotification('Select at least one GitHub preset', 'error');
            return;
        }

        const tokenSet = new Set([`"${cleanDomain}"`, cleanDomain]);

        selectedTypes.forEach((type) => {
            const patterns = githubDorks[type];
            if (patterns && patterns.length) {
                patterns.forEach((pattern) => {
                    const normalized = pattern.replace('{domain}', cleanDomain).trim();
                    if (normalized) {
                        tokenSet.add(normalized);
                    }
                });
            }
        });

        const query = Array.from(tokenSet).join(' ');
        if (!query.trim()) {
            showNotification('Unable to build GitHub query', 'error');
            return;
        }

        const searchUrl = `https://github.com/search?q=${encodeURIComponent(query)}&type=code`;
        window.open(searchUrl, '_blank');
        showNotification('GitHub search executed successfully!');
    }

    function executeYahooSearch() {
        const cleanDomain = getCleanDomain();
        if (!cleanDomain) {
            return;
        }

        const selectedTypes = Array.from(yahooOptions)
            .filter((option) => option.checked)
            .map((option) => option.value);

        if (!selectedTypes.length) {
            showNotification('Select at least one Yahoo preset', 'error');
            return;
        }

        const segments = [];

        selectedTypes.forEach((type) => {
            const patterns = yahooDorks[type];
            if (patterns && patterns.length) {
                segments.push(...patterns.map((pattern) => pattern.replace('{domain}', cleanDomain)));
            }
        });

        const query = buildLogicQuery(cleanDomain, segments);
        if (!query) {
            showNotification('Unable to build Yahoo query', 'error');
            return;
        }

        const searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
        showNotification('Yahoo search executed successfully!');
    }

    function showNotification(message, type = 'success') {
        const notificationText = notification.querySelector('span');
        notificationText.textContent = message;

        if (type === 'error') {
            notification.classList.add('error');
            notification.querySelector('i').className = 'fas fa-exclamation-circle';
        } else {
            notification.classList.remove('error');
            notification.querySelector('i').className = 'fas fa-check-circle';
        }

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    themeToggle.addEventListener('click', toggleTheme);

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                return;
            }

            const targetId = button.dataset.tab;

            tabButtons.forEach((btn) => {
                const isActive = btn === button;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            tabPanels.forEach((panel) => {
                const isActive = panel.id === targetId;
                panel.classList.toggle('active', isActive);
                panel.toggleAttribute('hidden', !isActive);
            });
        });
    });

    if (fileSearchBtn) {
        fileSearchBtn.addEventListener('click', executeFileSearch);
    }

    if (urlSearchBtn) {
        urlSearchBtn.addEventListener('click', executeUrlSearch);
    }

    if (githubSearchBtn) {
        githubSearchBtn.addEventListener('click', executeGithubSearch);
    }

    if (yahooSearchBtn) {
        yahooSearchBtn.addEventListener('click', executeYahooSearch);
    }

    dorkCards.forEach((card) => {
        card.addEventListener('click', function() {
            const dorkType = this.getAttribute('data-dork');
            executeDorkSearch(dorkType);
        });
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
});

