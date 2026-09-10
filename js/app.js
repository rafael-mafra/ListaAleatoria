// ========================================
// THEME TOGGLE - DARK/LIGHT MODE
// ========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            if (this.theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }
}

// Inicializar ThemeManager quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// ========================================
// DADOS INICIAIS
// ========================================

// Dados iniciais de exemplo
const initialData = [
    {
        id: 1,
        nome: "Dr. João Silva",
        categorias: ["medico"],
        especialidade: "Ortopedista e Traumatologista",
        telefone: "(11) 99876-5432",
        email: "joao.silva@email.com",
        endereco: "Rua das Flores, 123",
        bairro: "Centro",
        nota: 5,
        observacoes: "Ótimo médico, muito atencioso. Atende por convênio e particular.",
        dataCadastro: "2026-01-15"
    },
    {
        id: 2,
        nome: "Carlos Mendes",
        categorias: ["pedreiro", "encanador"],
        especialidade: "Reformas completas e acabamentos",
        telefone: "(11) 98765-4321",
        email: "",
        endereco: "Av. Brasil, 456",
        bairro: "Jardim América",
        nota: 4,
        observacoes: "Faz desde pintura até reforma completa. Orçamento gratuito.",
        dataCadastro: "2026-02-20"
    },
    {
        id: 3,
        nome: "Maria Oliveira",
        categorias: ["encanador", "servicos_gerais"],
        especialidade: "Hidráulica em geral",
        telefone: "(11) 97654-3210",
        email: "maria.oliveira@email.com",
        endereco: "Rua Augusta, 789",
        bairro: "Bela Vista",
        nota: 5,
        observacoes: "Especialista em vazamentos e reparos urgentes. Atende 24 horas.",
        dataCadastro: "2026-03-10"
    },
    {
        id: 4,
        nome: "Paulo Santos",
        categorias: ["eletricista"],
        especialidade: "Instalações elétricas residenciais",
        telefone: "(11) 96543-2109",
        email: "",
        endereco: "Rua Liberdade, 321",
        bairro: "Liberdade",
        nota: 4,
        observacoes: "Cadastrado na CREA. Faz laudo técnico.",
        dataCadastro: "2026-04-05"
    },
    {
        id: 5,
        nome: "Ana Costa",
        categorias: ["servicos_gerais", "pedreiro"],
        especialidade: "Limpeza e organização",
        telefone: "(11) 95432-1098",
        email: "ana.costa@email.com",
        endereco: "Rua Oscar Freire, 654",
        bairro: "Jardins",
        nota: 5,
        observacoes: "Limpeza residencial e comercial. Produtos próprios.",
        dataCadastro: "2026-05-12"
    },
    {
        id: 6,
        nome: "Roberto Ferreira",
        categorias: ["pedreiro", "eletricista"],
        especialidade: "Masonry e alvenaria",
        telefone: "(11) 94321-0987",
        email: "",
        endereco: "Rua Haddock Lobo, 987",
        bairro: "Cerqueira César",
        nota: 3,
        observacoes: "Bom para obras grandes. Equipe de auxiliares.",
        dataCadastro: "2026-06-18"
    }
];

// Classe principal do aplicativo
class ProfessionalsApp {
    constructor() {
        this.professionals = [];
        this.filteredProfessionals = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.editingId = null;
        this.deletingId = null;
        this.currentRating = 0;
        this.currentView = 'list'; // 'list' ou 'grid'
        this.selectedIcon = 'fa-briefcase'; // Ícone padrão
        
        // Mapeamento automático de palavras-chave para ícones
        this.iconMapping = {
            // Médico/Saúde
            'medico': 'fa-user-md', 'medica': 'fa-user-md', 'medicos': 'fa-user-md',
            'doutor': 'fa-user-md', 'doutora': 'fa-user-md', 'clinico': 'fa-user-md',
            'ortopedista': 'fa-user-injured', 'ortopedia': 'fa-user-injured',
            'dentista': 'fa-tooth', 'odontologista': 'fa-tooth', 'dentista': 'fa-tooth',
            'oftalmologista': 'fa-eye', 'oftalmologia': 'fa-eye',
            'neurologista': 'fa-brain', 'neurologia': 'fa-brain',
            'cardiologista': 'fa-heart', 'cardiologia': 'fa-heart',
            'enfermeiro': 'fa-user-nurse', 'enfermeira': 'fa-user-nurse',
            'fisioterapeuta': 'fa-hands', 'fisioterapia': 'fa-hands',
            'psicologo': 'fa-brain', 'psicologia': 'fa-brain',
            'veterinario': 'fa-paw', 'veterinaria': 'fa-paw',
            
            // Construção/Reforma
            'pedreiro': 'fa-hammer', 'pedreiros': 'fa-hammer',
            'construtor': 'fa-hard-hat', 'construtora': 'fa-hard-hat',
            'reformas': 'fa-hammer', 'reforma': 'fa-hammer',
            'alvenaria': 'fa-hammer', 'alvenar': 'fa-hammer',
            'pintor': 'fa-paint-roller', 'pintura': 'fa-paint-roller',
            'marceneiro': 'fa-tree', 'marcenaria': 'fa-tree',
            'serralheiro': 'fa-door-open', 'serralheria': 'fa-door-open',
            'vidraceiro': 'fa-window-maximize', 'vidracaria': 'fa-window-maximize',
            'azulejista': 'fa-border-all', 'azulejos': 'fa-border-all',
            'gesso': 'fa-object-group', 'gessos': 'fa-object-group',
            
            // Hidráulica
            'encanador': 'fa-faucet', 'encanadores': 'fa-faucet',
            'hidraulico': 'fa-faucet', 'hidraulica': 'fa-faucet',
            'torneira': 'fa-faucet', 'torneiras': 'fa-faucet',
            'vazamento': 'fa-water', 'vazamentos': 'fa-water',
            'bombas': 'fa-water', 'bomba': 'fa-water',
            
            // Elétrica
            'eletricista': 'fa-bolt', 'eletricistas': 'fa-bolt',
            'eletrico': 'fa-bolt', 'eletrica': 'fa-bolt',
            'eletricidade': 'fa-bolt', 'eletricidade': 'fa-bolt',
            'iluminacao': 'fa-lightbulb', 'iluminação': 'fa-lightbulb',
            'lampadas': 'fa-lightbulb', 'lâmpadas': 'fa-lightbulb',
            'chuveiro': 'fa-shower', 'chuveiros': 'fa-shower',
            'ar_condicionado': 'fa-snowflake', 'ar': 'fa-snowflake',
            'ventilacao': 'fa-fan', 'ventilação': 'fa-fan',
            
            // Limpeza/Serviços Gerais
            'limpeza': 'fa-broom', 'limpeza': 'fa-broom',
            'servicos_gerais': 'fa-broom', 'serviços_gerais': 'fa-broom',
            'faxina': 'fa-broom', 'faxineiro': 'fa-broom', 'faxineira': 'fa-broom',
            'lavanderia': 'fa-tshirt', 'roupas': 'fa-tshirt',
            'jardinagem': 'fa-leaf', 'jardineiro': 'fa-leaf', 'jardim': 'fa-leaf',
            'paisagismo': 'fa-tree', 'paisagista': 'fa-tree',
            'dedetizacao': 'fa-bug', 'dedetizador': 'fa-bug', 'pragas': 'fa-bug',
            
            // Transporte/Mudança
            'mudanca': 'fa-truck', 'mudança': 'fa-truck', 'mudanças': 'fa-truck',
            'transporte': 'fa-truck', 'transportadora': 'fa-truck',
            'carreto': 'fa-truck', 'carretos': 'fa-truck',
            'carro': 'fa-car', 'automovel': 'fa-car', 'automóvel': 'fa-car',
            'moto': 'fa-motorcycle', 'motocicleta': 'fa-motorcycle',
            'bicicleta': 'fa-bicycle', 'bike': 'fa-bicycle',
            
            // Tecnologia/Informática
            'informatica': 'fa-laptop', 'informática': 'fa-laptop',
            'computador': 'fa-desktop', 'computadores': 'fa-desktop',
            'celular': 'fa-mobile-alt', 'telefones': 'fa-mobile-alt',
            'tecnologia': 'fa-microchip', 'tech': 'fa-microchip',
            'internet': 'fa-wifi', 'wifi': 'fa-wifi',
            'rede': 'fa-network-wired', 'redes': 'fa-network-wired',
            'camera': 'fa-camera', 'câmera': 'fa-camera', 'fotografia': 'fa-camera',
            'video': 'fa-video', 'vídeo': 'fa-video', 'filmagem': 'fa-video',
            'musica': 'fa-music', 'música': 'fa-music', 'musico': 'fa-music',
            'som': 'fa-volume-up', 'audio': 'fa-volume-up', 'áudio': 'fa-volume-up',
            
            // Educação
            'professor': 'fa-chalkboard-teacher', 'professora': 'fa-chalkboard-teacher',
            'aulas': 'fa-graduation-cap', 'aula': 'fa-graduation-cap',
            'curso': 'fa-book', 'cursos': 'fa-book',
            'escola': 'fa-school', 'educacao': 'fa-graduation-cap', 'educação': 'fa-graduation-cap',
            
            // Alimentação
            'restaurante': 'fa-utensils', 'restaurante': 'fa-utensils',
            'comida': 'fa-utensils', 'food': 'fa-utensils',
            'churrasco': 'fa-fire', 'churrasqueiro': 'fa-fire',
            'pizzaria': 'fa-pizza-slice', 'pizza': 'fa-pizza-slice',
            'padaria': 'fa-bread-slice', 'padeiro': 'fa-bread-slice',
            'confeitaria': 'fa-birthday-cake', 'confeiteiro': 'fa-birthday-cake',
            'cafeteria': 'fa-coffee', 'cafe': 'fa-coffee', 'café': 'fa-coffee',
            'bar': 'fa-beer', 'cerveja': 'fa-beer',
            'amburguer': 'fa-hamburger', 'hamburguer': 'fa-hamburger',
            
            // Serviços Profissionais
            'advogado': 'fa-gavel', 'advocacia': 'fa-gavel', 'advogada': 'fa-gavel',
            'contabil': 'fa-calculator', 'contabilidade': 'fa-calculator', 'contador': 'fa-calculator',
            'arquiteto': 'fa-drafting-compass', 'arquitetura': 'fa-drafting-compass',
            'engenheiro': 'fa-drafting-compass', 'engenharia': 'fa-drafting-compass',
            'designer': 'fa-palette', 'design': 'fa-palette',
            'fotografo': 'fa-camera', 'fotógrafo': 'fa-camera', 'fotografia': 'fa-camera',
            'maquiador': 'fa-magic', 'maquiagem': 'fa-magic',
            'cabeleireiro': 'fa-cut', 'cabeleireira': 'fa-cut', 'salao': 'fa-cut', 'salão': 'fa-cut',
            'barbeiro': 'fa-cut', 'barbearia': 'fa-cut',
            'manicure': 'fa-hand-sparkles', 'pedicure': 'fa-hand-sparkles',
            'estetica': 'fa-spa', 'estética': 'fa-spa', 'esteticista': 'fa-spa',
            'massagista': 'fa-hands', 'massagem': 'fa-hands',
            
            // Animais/Pet
            'pet': 'fa-paw', 'pets': 'fa-paw', 'animal': 'fa-paw', 'animais': 'fa-paw',
            'cachorro': 'fa-dog', 'cachorros': 'fa-dog', 'gato': 'fa-cat', 'gatos': 'fa-cat',
            'peixe': 'fa-fish', 'passaro': 'fa-dove', 'pássaro': 'fa-dove',
            'petshop': 'fa-paw', 'racao': 'fa-paw', 'ração': 'fa-paw',
            
            // Comércio/Vendas
            'loja': 'fa-store', 'lojas': 'fa-store', 'comercio': 'fa-store', 'comércio': 'fa-store',
            'supermercado': 'fa-shopping-cart', 'mercado': 'fa-shopping-cart',
            'roupas': 'fa-tshirt', 'moda': 'fa-tshirt',
            'calcados': 'fa-shoe-prints', 'calçados': 'fa-shoe-prints', 'sapatos': 'fa-shoe-prints',
            'joalheria': 'fa-gem', 'joias': 'fa-gem',
            'livraria': 'fa-book', 'livros': 'fa-book',
            'floricultura': 'fa-seedling', 'flores': 'fa-seedling',
            
            // Finanças
            'banco': 'fa-university', 'financeiro': 'fa-money-bill',
            'investimento': 'fa-chart-line', 'investimentos': 'fa-chart-line',
            'seguro': 'fa-shield-alt', 'seguros': 'fa-shield-alt',
            'imobiliaria': 'fa-home', 'imobiliária': 'fa-home', 'imovel': 'fa-home', 'imóvel': 'fa-home',
            
            // Outros
            'outro': 'fa-briefcase', 'outros': 'fa-briefcase', 'outros': 'fa-briefcase',
            'diversos': 'fa-ellipsis-h', 'variados': 'fa-ellipsis-h',
            'geral': 'fa-th', 'generico': 'fa-th', 'genérico': 'fa-th',
            'personalizado': 'fa-cog', 'customizado': 'fa-cog',
            'novo': 'fa-plus-circle', 'novidade': 'fa-star',
            'premium': 'fa-crown', 'vip': 'fa-crown',
            'rapido': 'fa-bolt', 'rápido': 'fa-bolt', 'urgente': 'fa-bolt',
            'qualidade': 'fa-award', 'qualificado': 'fa-award',
            'confiavel': 'fa-check-circle', 'confiável': 'fa-check-circle',
            'recomendado': 'fa-thumbs-up', 'indicado': 'fa-thumbs-up',
            'avaliado': 'fa-star', 'avaliacao': 'fa-star', 'avaliação': 'fa-star',
            'popular': 'fa-fire', 'mais_pedidos': 'fa-fire',
            'economico': 'fa-tag', 'econômico': 'fa-tag', 'barato': 'fa-tag',
            'promocao': 'fa-percent', 'promoção': 'fa-percent', 'desconto': 'fa-percent',
            'frete': 'fa-truck', 'entrega': 'fa-shipping-fast', 'entregas': 'fa-shipping-fast',
            'agendamento': 'fa-calendar', 'agendamentos': 'fa-calendar', 'agenda': 'fa-calendar',
            'horario': 'fa-clock', 'horário': 'fa-clock', 'funcionamento': 'fa-clock',
            'localizacao': 'fa-map-marker-alt', 'localização': 'fa-map-marker-alt', 'endereco': 'fa-map-marker-alt', 'endereço': 'fa-map-marker-alt',
            'contato': 'fa-phone', 'contatos': 'fa-phone', 'telefone': 'fa-phone',
            'email': 'fa-envelope', 'e-mail': 'fa-envelope', 'correio': 'fa-envelope',
            'site': 'fa-globe', 'website': 'fa-globe', 'web': 'fa-globe',
            'redes_sociais': 'fa-share-alt', 'social': 'fa-share-alt',
            'whatsapp': 'fa-whatsapp', 'zap': 'fa-whatsapp',
            'instagram': 'fa-instagram', 'facebook': 'fa-facebook',
            'youtube': 'fa-youtube', 'tiktok': 'fa-tiktok',
            'twitter': 'fa-twitter', 'linkedin': 'fa-linkedin',
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.updateCategorySelect();
        this.bindEvents();
        this.setView('list'); // Visualização padrão: lista
        this.render();
        this.updateStats();
    }

    // Carregar dados do LocalStorage
    loadData() {
        const saved = localStorage.getItem('professionals');
        if (saved) {
            this.professionals = JSON.parse(saved);
        } else {
            this.professionals = [...initialData];
            this.saveData();
        }
        this.filteredProfessionals = [...this.professionals];
    }

    // Salvar dados no LocalStorage
    saveData() {
        localStorage.setItem('professionals', JSON.stringify(this.professionals));
    }

    // Vincular eventos
    bindEvents() {
        // Busca
        document.getElementById('searchInput').addEventListener('input', () => this.handleSearch());
        
        // Filtros
        document.getElementById('categoryFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('sortOrder').addEventListener('change', () => this.handleSearch());
        
        // Toggle de visualização
        document.getElementById('listViewBtn').addEventListener('click', () => this.setView('list'));
        document.getElementById('gridViewBtn').addEventListener('click', () => this.setView('grid'));
        
        // Paginação
        document.getElementById('prevPage').addEventListener('click', () => this.prevPage());
        document.getElementById('nextPage').addEventListener('click', () => this.nextPage());
        
        // Modal de adicionar/editar
        document.getElementById('addNewBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        
        // Modal de excluir
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());
        
        // Formulário
        document.getElementById('professionalForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Select de categorias
        document.getElementById('categorySelect').addEventListener('change', (e) => this.updateSelectedCategories());
        
        // Botão de adicionar categoria
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.openCategoryModal());
        
        // Modal de adicionar categoria
        document.getElementById('closeCategoryModal').addEventListener('click', () => this.closeCategoryModal());
        document.getElementById('cancelCategoryBtn').addEventListener('click', () => this.closeCategoryModal());
        document.getElementById('confirmCategoryBtn').addEventListener('click', () => this.addNewCategory());
        
        // Fechar modal de categoria ao clicar fora
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target.id === 'categoryModal') this.closeCategoryModal();
        });
        
        // Avaliação (estrelas)
        document.querySelectorAll('.rating-input i').forEach(star => {
            star.addEventListener('click', (e) => this.handleRating(e));
            star.addEventListener('mouseenter', (e) => this.hoverRating(e));
            star.addEventListener('mouseleave', () => this.resetRatingHover());
        });
        
        // Fechar modais ao clicar fora
        document.getElementById('professionalModal').addEventListener('click', (e) => {
            if (e.target.id === 'professionalModal') this.closeModal();
        });
        document.getElementById('deleteModal').addEventListener('click', (e) => {
            if (e.target.id === 'deleteModal') this.closeDeleteModal();
        });
        
        // Máscara de telefone
        document.getElementById('phone').addEventListener('input', (e) => this.maskPhone(e));
    }

    // Alternar visualização
    setView(view) {
        this.currentView = view;
        
        // Atualizar botões
        document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
        document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
        
        // Mostrar/esconder containers
        document.getElementById('listView').style.display = view === 'list' ? 'block' : 'none';
        document.getElementById('gridView').style.display = view === 'grid' ? 'grid' : 'none';
        
        this.render();
    }

    // Carregar categorias customizadas
    loadCustomCategories() {
        const saved = localStorage.getItem('customCategories');
        return saved ? JSON.parse(saved) : [];
    }

    // Salvar categorias customizadas
    saveCustomCategories(categories) {
        localStorage.setItem('customCategories', JSON.stringify(categories));
    }

    // Atualizar select de categorias com customizadas
    updateCategorySelect() {
        const select = document.getElementById('categorySelect');
        const filterSelect = document.getElementById('categoryFilter');
        const customCategories = this.loadCustomCategories();
        
        // Categorias padrão
        const defaultCategories = [
            { value: 'medico', name: 'Médico', icon: 'fa-user-md' },
            { value: 'pedreiro', name: 'Pedreiro', icon: 'fa-hammer' },
            { value: 'encanador', name: 'Encanador', icon: 'fa-faucet' },
            { value: 'eletricista', name: 'Eletricista', icon: 'fa-bolt' },
            { value: 'servicos_gerais', name: 'Serviços Gerais', icon: 'fa-broom' },
            { value: 'outro', name: 'Outro', icon: 'fa-briefcase' }
        ];
        
        // Combinar categorias padrão com customizadas e ordenar alfabeticamente
        const allCategories = [...defaultCategories, ...customCategories]
            .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        
        // Limpar e popular select de categorias (formulário)
        select.innerHTML = allCategories.map(cat => 
            `<option value="${cat.value}">${cat.name}</option>`
        ).join('');
        
        // Atualizar select de filtro (apenas categorias usadas)
        const usedCategories = [...new Set(this.professionals.flatMap(p => p.categorias))];
        filterSelect.innerHTML = '<option value="">Todas as categorias</option>' + 
            allCategories
                .filter(cat => usedCategories.includes(cat.value))
                .map(cat => `<option value="${cat.value}">${cat.name}</option>`)
                .join('');
    }

    // Atualizar categorias selecionadas (tags)
    updateSelectedCategories() {
        const select = document.getElementById('categorySelect');
        const container = document.getElementById('selectedCategories');
        const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
        
        const categoryNames = this.getCategoryNames();
        
        container.innerHTML = selectedOptions.map(cat => 
            `<span class="selected-category-tag">
                <i class="fas fa-times-circle" data-category="${cat}"></i>
                ${categoryNames[cat] || cat}
            </span>`
        ).join('');
        
        // Adicionar eventos para remover categorias
        container.querySelectorAll('i').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.removeCategory(category);
            });
        });
    }

    // Remover categoria selecionada
    removeCategory(category) {
        const select = document.getElementById('categorySelect');
        const option = select.querySelector(`option[value="${category}"]`);
        if (option) {
            option.selected = false;
        }
        this.updateSelectedCategories();
    }

    // Obter nomes das categorias
    getCategoryNames() {
        const customCategories = this.loadCustomCategories();
        const defaultCategories = {
            'medico': 'Médico',
            'pedreiro': 'Pedreiro',
            'encanador': 'Encanador',
            'eletricista': 'Eletricista',
            'servicos_gerais': 'Serviços Gerais',
            'outro': 'Outro'
        };
        
        customCategories.forEach(cat => {
            defaultCategories[cat.value] = cat.name;
        });
        
        return defaultCategories;
    }

    // Obter ícones das categorias
    getCategoryIcons() {
        const customCategories = this.loadCustomCategories();
        const defaultIcons = {
            'medico': 'fa-user-md',
            'pedreiro': 'fa-hammer',
            'encanador': 'fa-faucet',
            'eletricista': 'fa-bolt',
            'servicos_gerais': 'fa-broom',
            'outro': 'fa-briefcase'
        };
        
        customCategories.forEach(cat => {
            defaultIcons[cat.value] = cat.icon;
        });
        
        return defaultIcons;
    }

    // Abrir modal de adicionar categoria
    openCategoryModal() {
        document.getElementById('categoryModal').classList.add('active');
        document.getElementById('newCategoryName').value = '';
        this.selectedIcon = 'fa-briefcase';
        this.updateIconPreview();
        document.getElementById('newCategoryName').focus();
        
        // Adicionar evento de input para sugerir ícone
        document.getElementById('newCategoryName').addEventListener('input', (e) => {
            this.suggestIcon(e.target.value);
        });
    }

    // Fechar modal de adicionar categoria
    closeCategoryModal() {
        document.getElementById('categoryModal').classList.remove('active');
    }

    // Sugerir ícone baseado no nome da categoria
    suggestIcon(categoryName) {
        const normalizedName = categoryName.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .trim();
        
        // Procurar correspondência no mapeamento
        let suggestedIcon = 'fa-briefcase'; // Ícone padrão
        
        for (const [keyword, icon] of Object.entries(this.iconMapping)) {
            if (normalizedName.includes(keyword) || keyword.includes(normalizedName)) {
                suggestedIcon = icon;
                break;
            }
        }
        
        // Se não encontrou correspondência exata, tentar busca parcial
        if (suggestedIcon === 'fa-briefcase' && normalizedName.length > 2) {
            for (const [keyword, icon] of Object.entries(this.iconMapping)) {
                if (normalizedName.substring(0, 3) === keyword.substring(0, 3)) {
                    suggestedIcon = icon;
                    break;
                }
            }
        }
        
        this.selectedIcon = suggestedIcon;
        this.updateIconPreview();
    }

    // Atualizar preview do ícone
    updateIconPreview() {
        const preview = document.getElementById('iconPreview');
        preview.innerHTML = `<i class="fas ${this.selectedIcon}"></i><span>${this.selectedIcon}</span>`;
    }

    // Adicionar nova categoria
    addNewCategory() {
        const name = document.getElementById('newCategoryName').value.trim();
        
        if (!name) {
            this.showToast('Digite o nome da categoria!', 'error');
            return;
        }
        
        // Criar valor da categoria (slug)
        const value = name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_');
        
        // Verificar se já existe
        const customCategories = this.loadCustomCategories();
        if (customCategories.some(cat => cat.value === value)) {
            this.showToast('Esta categoria já existe!', 'error');
            return;
        }
        
        // Adicionar nova categoria com ícone sugerido automaticamente
        const newCategory = {
            value: value,
            name: name,
            icon: this.selectedIcon
        };
        
        customCategories.push(newCategory);
        this.saveCustomCategories(customCategories);
        
        // Atualizar selects
        this.updateCategorySelect();
        
        // Selecionar a nova categoria no select
        const select = document.getElementById('categorySelect');
        const newOption = select.querySelector(`option[value="${value}"]`);
        if (newOption) {
            newOption.selected = true;
        }
        this.updateSelectedCategories();
        
        this.closeCategoryModal();
        this.showToast('Categoria adicionada com sucesso!', 'success');
    }

    // Busca e filtros
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortOrder').value;
        
        this.filteredProfessionals = this.professionals.filter(p => {
            const matchesSearch = p.nome.toLowerCase().includes(searchTerm) ||
                                p.especialidade.toLowerCase().includes(searchTerm) ||
                                p.observacoes.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || p.categorias.includes(category);
            return matchesSearch && matchesCategory;
        });
        
        // Ordenação
        this.filteredProfessionals.sort((a, b) => {
            if (sortBy === 'nome') return a.nome.localeCompare(b.nome);
            if (sortBy === 'categoria') return a.categorias[0].localeCompare(b.categorias[0]);
            if (sortBy === 'nota') return b.nota - a.nota;
            if (sortBy === 'dataCadastro') return new Date(b.dataCadastro) - new Date(a.dataCadastro);
            return 0;
        });
        
        this.currentPage = 1;
        this.render();
    }

    // Renderizar lista
    render() {
        const listView = document.getElementById('listView');
        const gridView = document.getElementById('gridView');
        const tableBody = document.getElementById('professionalsTableBody');
        const noResults = document.getElementById('noResults');
        
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageItems = this.filteredProfessionals.slice(start, end);
        
        if (pageItems.length === 0) {
            if (tableBody) tableBody.innerHTML = '';
            gridView.innerHTML = '';
            noResults.style.display = 'block';
            listView.style.display = 'none';
            gridView.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            
            if (this.currentView === 'list') {
                listView.style.display = 'block';
                gridView.style.display = 'none';
                if (tableBody) {
                    tableBody.innerHTML = pageItems.map(p => this.createTableRow(p)).join('');
                }
            } else {
                listView.style.display = 'none';
                gridView.style.display = 'grid';
                gridView.innerHTML = pageItems.map(p => this.createCard(p)).join('');
            }
            
            this.bindCardEvents();
        }
        
        this.updatePagination();
    }

    // Criar card do profissional
    createCard(professional) {
        const categoryNames = this.getCategoryNames();
        const categoryIcons = this.getCategoryIcons();
        
        const stars = this.createStars(professional.nota);
        
        // Criar tags de categorias
        const categoriesTags = professional.categorias.map(cat => 
            `<span class="card-category">
                <i class="fas ${categoryIcons[cat] || 'fa-tag'}"></i>
                ${categoryNames[cat] || cat}
            </span>`
        ).join('');
        
        return `
            <div class="professional-card" data-id="${professional.id}">
                <div class="card-header">
                    <div class="card-categories">${categoriesTags}</div>
                </div>
                <div class="card-body">
                    <h3 class="card-name">${professional.nome}</h3>
                    ${professional.especialidade ? `<p class="card-specialty">${professional.especialidade}</p>` : ''}
                    <div class="card-rating">${stars}</div>
                    <div class="card-contact">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${professional.telefone}</span>
                        </div>
                        ${professional.email ? `
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>${professional.email}</span>
                            </div>
                        ` : ''}
                        ${professional.bairro ? `
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${professional.bairro}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-secondary card-btn edit-btn" data-id="${professional.id}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger card-btn delete-btn" data-id="${professional.id}">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
    }

    // Criar linha da tabela
    createTableRow(professional) {
        const categoryNames = this.getCategoryNames();
        const categoryIcons = this.getCategoryIcons();
        
        const stars = this.createStars(professional.nota);
        
        // Criar tags de categorias
        const categoriesTags = professional.categorias.map(cat => 
            `<span class="table-category">
                <i class="fas ${categoryIcons[cat] || 'fa-tag'}"></i>
                ${categoryNames[cat] || cat}
            </span>`
        ).join(' ');
        
        return `
            <tr data-id="${professional.id}">
                <td class="table-name">${professional.nome}</td>
                <td>
                    <div class="table-categories">${categoriesTags}</div>
                </td>
                <td class="table-specialty">${professional.especialidade || '-'}</td>
                <td class="table-phone">${professional.telefone}</td>
                <td class="table-neighborhood">${professional.bairro || '-'}</td>
                <td>
                    <div class="table-rating">${stars}</div>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary table-btn edit-btn" data-id="${professional.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger table-btn delete-btn" data-id="${professional.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    // Criar estrelas
    createStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="fas fa-star empty"></i>';
            }
        }
        return stars;
    }

    // Vincular eventos dos cards
    bindCardEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.openModal(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.openDeleteModal(id);
            });
        });
    }

    // Atualizar paginação
    updatePagination() {
        const totalPages = Math.ceil(this.filteredProfessionals.length / this.itemsPerPage);
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredProfessionals.length);
        const total = this.filteredProfessionals.length;
        
        document.getElementById('prevPage').disabled = this.currentPage === 1;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages || totalPages === 0;
        document.getElementById('pageInfo').textContent = `Exibindo ${start}-${end} de ${total} profissionais | Página ${this.currentPage} de ${totalPages || 1}`;
    }

    // Página anterior
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.render();
        }
    }

    // Próxima página
    nextPage() {
        const totalPages = Math.ceil(this.filteredProfessionals.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.render();
        }
    }

    // Abrir modal
    openModal(id = null) {
        this.editingId = id;
        const modal = document.getElementById('professionalModal');
        const title = document.getElementById('modalTitle');
        
        // Atualizar select de categorias
        this.updateCategorySelect();
        
        if (id) {
            title.textContent = 'Editar Profissional';
            const professional = this.professionals.find(p => p.id === id);
            this.fillForm(professional);
        } else {
            title.textContent = 'Adicionar Profissional';
            this.resetForm();
        }
        
        modal.classList.add('active');
    }

    // Fechar modal
    closeModal() {
        document.getElementById('professionalModal').classList.remove('active');
        this.resetForm();
        this.editingId = null;
    }

    // Preencher formulário
    fillForm(professional) {
        document.getElementById('professionalId').value = professional.id;
        document.getElementById('name').value = professional.nome;
        document.getElementById('specialty').value = professional.especialidade;
        document.getElementById('phone').value = professional.telefone;
        document.getElementById('email').value = professional.email;
        document.getElementById('address').value = professional.endereco;
        document.getElementById('neighborhood').value = professional.bairro;
        document.getElementById('notes').value = professional.observacoes;
        document.getElementById('rating').value = professional.nota;
        
        // Preencher select de categorias
        const select = document.getElementById('categorySelect');
        Array.from(select.options).forEach(option => {
            option.selected = professional.categorias.includes(option.value);
        });
        this.updateSelectedCategories();
        
        this.currentRating = professional.nota;
        this.updateRatingStars();
    }

    // Resetar formulário
    resetForm() {
        document.getElementById('professionalForm').reset();
        document.getElementById('professionalId').value = '';
        this.currentRating = 0;
        this.updateRatingStars();
        // Desmarcar todas as opções do select
        const select = document.getElementById('categorySelect');
        Array.from(select.options).forEach(option => {
            option.selected = false;
        });
        this.updateSelectedCategories();
    }

    // Lidar com envio do formulário
    handleSubmit(e) {
        e.preventDefault();
        
        // Obter categorias selecionadas
        const select = document.getElementById('categorySelect');
        const selectedCategories = Array.from(select.selectedOptions).map(opt => opt.value);
        
        // Validar se pelo menos uma categoria foi selecionada
        if (selectedCategories.length === 0) {
            this.showToast('Selecione pelo menos uma categoria!', 'error');
            return;
        }
        
        const formData = {
            nome: document.getElementById('name').value.trim(),
            categorias: selectedCategories,
            especialidade: document.getElementById('specialty').value.trim(),
            telefone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            endereco: document.getElementById('address').value.trim(),
            bairro: document.getElementById('neighborhood').value.trim(),
            nota: this.currentRating,
            observacoes: document.getElementById('notes').value.trim()
        };
        
        if (this.editingId) {
            // Editar existente
            const index = this.professionals.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.professionals[index] = {
                    ...this.professionals[index],
                    ...formData
                };
                this.showToast('Profissional atualizado com sucesso!', 'success');
            }
        } else {
            // Adicionar novo
            const newProfessional = {
                id: Date.now(),
                ...formData,
                dataCadastro: new Date().toISOString().split('T')[0]
            };
            this.professionals.push(newProfessional);
            this.showToast('Profissional adicionado com sucesso!', 'success');
        }
        
        this.saveData();
        this.handleSearch();
        this.updateStats();
        this.closeModal();
    }

    // Lidar com avaliação
    handleRating(e) {
        const rating = parseInt(e.target.dataset.rating);
        this.currentRating = rating;
        document.getElementById('rating').value = rating;
        this.updateRatingStars();
    }

    hoverRating(e) {
        const rating = parseInt(e.target.dataset.rating);
        const stars = document.querySelectorAll('.rating-input i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    resetRatingHover() {
        this.updateRatingStars();
    }

    updateRatingStars() {
        const stars = document.querySelectorAll('.rating-input i');
        stars.forEach((star, index) => {
            if (index < this.currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Máscara de telefone
    maskPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    }

    // Modal de exclusão
    openDeleteModal(id) {
        this.deletingId = id;
        const professional = this.professionals.find(p => p.id === id);
        document.getElementById('deleteProfessionalName').textContent = professional.nome;
        document.getElementById('deleteModal').classList.add('active');
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('active');
        this.deletingId = null;
    }

    confirmDelete() {
        if (this.deletingId) {
            this.professionals = this.professionals.filter(p => p.id !== this.deletingId);
            this.saveData();
            this.updateCategorySelect();
            this.handleSearch();
            this.updateStats();
            this.showToast('Profissional excluído com sucesso!', 'success');
        }
        this.closeDeleteModal();
    }

    // Atualizar estatísticas
    updateStats() {
        const total = this.professionals.length;
        const avgRating = total > 0 
            ? (this.professionals.reduce((sum, p) => sum + p.nota, 0) / total).toFixed(1)
            : 0;
        // Contar categorias únicas
        const allCategories = this.professionals.flatMap(p => p.categorias);
        const categories = new Set(allCategories).size;
        
        document.getElementById('totalProfissionais').textContent = total;
        document.getElementById('mediaNotas').textContent = avgRating;
        document.getElementById('categoriasDisponiveis').textContent = categories;
    }

    // Toast de notificação
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toastIcon');
        const msg = document.getElementById('toastMessage');
        
        toast.className = `toast ${type}`;
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        msg.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Inicializar aplicativo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalsApp();
});
