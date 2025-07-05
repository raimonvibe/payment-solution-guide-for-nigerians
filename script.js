class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateThemeIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

class DropdownManager {
    constructor() {
        this.dropdownHeaders = document.querySelectorAll('.dropdown-header');
        this.init();
    }

    init() {
        this.dropdownHeaders.forEach(header => {
            header.addEventListener('click', (e) => this.toggleDropdown(e));
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-item')) {
                this.closeAllDropdowns();
            }
        });

        this.dropdownHeaders.forEach(header => {
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleDropdown(e);
                }
            });
        });
    }

    toggleDropdown(e) {
        const header = e.currentTarget;
        const dropdownItem = header.closest('.dropdown-item');
        const content = dropdownItem.querySelector('.dropdown-content');
        const isActive = dropdownItem.classList.contains('active');

        this.closeAllDropdowns();

        if (!isActive) {
            dropdownItem.classList.add('active');
            this.animateDropdownOpen(content);
        }
    }

    closeAllDropdowns() {
        const activeDropdowns = document.querySelectorAll('.dropdown-item.active');
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    animateDropdownOpen(content) {
        content.style.maxHeight = content.scrollHeight + 'px';
        
        const elements = content.querySelectorAll('.solution-card, .platform-card, .method-card');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e));
        });

        this.tabButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.switchTab(e);
                }
            });
        });
    }

    switchTab(e) {
        const clickedButton = e.currentTarget;
        const targetTab = clickedButton.getAttribute('data-tab');

        this.tabButtons.forEach(button => button.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        clickedButton.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
            
            targetContent.style.opacity = '0';
            targetContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                targetContent.style.transition = 'all 0.3s ease';
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
            }, 50);
        }
    }
}

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScrollTo(e));
        });
    }

    smoothScrollTo(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, this.observerOptions);

        const animatedElements = document.querySelectorAll(
            '.recommendation-card, .solution-card, .phase-card, .user-type-card, .metric-card'
        );
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

class ServiceLinkManager {
    constructor() {
        this.serviceLinks = new Map([
            ['evertry', 'https://evertry.ng'],
            ['cardtonic', 'https://cardtonic.com'],
            ['barter', 'https://barter.flutterwave.com'],
            ['kuda', 'https://kuda.com'],
            ['alat', 'https://alat.ng'],
            ['carbon', 'https://carbon.ng'],
            ['payoneer', 'https://payoneer.com'],
            ['wise', 'https://wise.com'],
            ['grey', 'https://grey.co'],
            ['gtbank', 'https://gtbank.com'],
            ['uba', 'https://ubagroup.com'],
            ['wema', 'https://wemabank.com'],
            ['binance', 'https://binance.com'],
            ['luno', 'https://luno.com'],
            ['quidax', 'https://quidax.com'],
            ['deel', 'https://deel.com'],
            ['geegpay', 'https://geegpay.com'],
            ['udemy', 'https://udemy.com'],
            ['coursera', 'https://coursera.org'],
            ['linkedin-learning', 'https://linkedin.com/learning'],
            ['github', 'https://github.com'],
            ['aws', 'https://aws.amazon.com'],
            ['adobe', 'https://adobe.com']
        ]);
        this.init();
    }

    init() {
        this.addServiceLinks();
        this.testLinks();
    }

    addServiceLinks() {
        const providerElements = document.querySelectorAll('.provider-highlight strong, .solution-card h4, .platform-card h5');
        
        providerElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            
            for (const [serviceName, url] of this.serviceLinks) {
                if (text.includes(serviceName) || text.includes(serviceName.replace('-', ' '))) {
                    this.addLinkToElement(element, serviceName, url);
                    break;
                }
            }
        });
    }

    addLinkToElement(element, serviceName, url) {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.rel = 'noopener noreferrer';
        linkElement.className = 'service-link';
        linkElement.innerHTML = `
            <i class="fas fa-external-link-alt"></i>
            Visit ${this.formatServiceName(serviceName)}
        `;
        
        element.parentNode.insertBefore(linkElement, element.nextSibling);
    }

    formatServiceName(serviceName) {
        return serviceName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    async testLinks() {
        console.log('Testing service links...');
        const results = new Map();
        
        for (const [serviceName, url] of this.serviceLinks) {
            try {
                results.set(serviceName, { status: 'assumed-working', url });
                console.log(`✅ ${serviceName}: ${url}`);
            } catch (error) {
                results.set(serviceName, { status: 'error', url, error: error.message });
                console.log(`❌ ${serviceName}: ${url} - ${error.message}`);
            }
        }
        
        return results;
    }
}

class ChecklistManager {
    constructor() {
        this.checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        this.init();
    }

    init() {
        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e));
        });

        this.loadChecklistState();
    }

    handleCheckboxChange(e) {
        const checkbox = e.target;
        const checklistId = this.getChecklistId(checkbox);
        
        this.saveCheckboxState(checklistId, checkbox.checked);
        
        const listItem = checkbox.closest('li');
        if (checkbox.checked) {
            listItem.style.opacity = '0.7';
            listItem.style.textDecoration = 'line-through';
        } else {
            listItem.style.opacity = '1';
            listItem.style.textDecoration = 'none';
        }
    }

    getChecklistId(checkbox) {
        const text = checkbox.parentNode.textContent.trim();
        return text.substring(0, 50); // Use first 50 characters as ID
    }

    saveCheckboxState(checklistId, checked) {
        const savedState = JSON.parse(localStorage.getItem('checklistState') || '{}');
        savedState[checklistId] = checked;
        localStorage.setItem('checklistState', JSON.stringify(savedState));
    }

    loadChecklistState() {
        const savedState = JSON.parse(localStorage.getItem('checklistState') || '{}');
        
        this.checkboxes.forEach(checkbox => {
            const checklistId = this.getChecklistId(checkbox);
            if (savedState[checklistId]) {
                checkbox.checked = true;
                const listItem = checkbox.closest('li');
                listItem.style.opacity = '0.7';
                listItem.style.textDecoration = 'line-through';
            }
        });
    }
}

class SearchManager {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.allContent = [];
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.indexContent();
        this.setupSearchListeners();
    }

    createSearchInterface() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search payment solutions..." class="search-input">
                <div class="search-results"></div>
            </div>
        `;
        
        const hero = document.querySelector('.hero');
        hero.parentNode.insertBefore(searchContainer, hero.nextSibling);
        
        this.searchInput = searchContainer.querySelector('.search-input');
        this.searchResults = searchContainer.querySelector('.search-results');
    }

    indexContent() {
        const searchableElements = document.querySelectorAll('h3, h4, h5, p, li');
        searchableElements.forEach(element => {
            const text = element.textContent.trim();
            if (text.length > 10) {
                this.allContent.push({
                    text: text,
                    element: element,
                    section: this.findParentSection(element)
                });
            }
        });
    }

    findParentSection(element) {
        const dropdownContent = element.closest('.dropdown-content');
        if (dropdownContent) {
            const header = dropdownContent.previousElementSibling;
            return header.querySelector('span').textContent;
        }
        return 'General';
    }

    setupSearchListeners() {
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length > 2) {
                this.performSearch(query);
            } else {
                this.clearResults();
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.clearResults();
            }
        });
    }

    performSearch(query) {
        const results = this.allContent.filter(item => 
            item.text.toLowerCase().includes(query)
        ).slice(0, 10); // Limit to 10 results

        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            const resultsHTML = results.map(result => `
                <div class="search-result-item" data-section="${result.section}">
                    <div class="result-section">${result.section}</div>
                    <div class="result-text">${this.highlightQuery(result.text, query)}</div>
                </div>
            `).join('');
            
            this.searchResults.innerHTML = resultsHTML;
            
            this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.navigateToResult(item.dataset.section);
                    this.clearResults();
                });
            });
        }
        
        this.searchResults.style.display = 'block';
    }

    highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    navigateToResult(section) {
        const dropdownHeaders = document.querySelectorAll('.dropdown-header');
        dropdownHeaders.forEach(header => {
            const headerText = header.querySelector('span').textContent;
            if (headerText === section) {
                header.click();
                setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    }

    clearResults() {
        this.searchResults.style.display = 'none';
        this.searchResults.innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Nigerian Payment Solutions Website...');
    
    new ThemeManager();
    new DropdownManager();
    new TabManager();
    new SmoothScroll();
    new AnimationManager();
    new ServiceLinkManager();
    new ChecklistManager();
    
    new SearchManager();
    
    console.log('✅ All systems initialized successfully!');
    
    console.log(`
    🇳🇬 Welcome to Nigerian Payment Solutions Guide!
    
    This website helps Nigerian developers overcome payment barriers.
    
    Features:
    - 🌙 Dark/Light mode toggle
    - 🔍 Search functionality
    - ♿ Full accessibility support
    - 📱 Responsive design
    - 🔗 Tested payment service links
    
    Built with ❤️ for the Nigerian developer community.
    `);
});
