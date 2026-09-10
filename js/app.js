// Dados iniciais de exemplo
const initialData = [
    {
        id: 1,
        nome: "Dr. João Silva",
        categoria: "medico",
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
        categoria: "pedreiro",
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
        categoria: "encanador",
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
        categoria: "eletricista",
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
        categoria: "servicos_gerais",
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
        categoria: "pedreiro",
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
        
        this.init();
    }

    init() {
        this.loadData();
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

    // Busca e filtros
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortOrder').value;
        
        this.filteredProfessionals = this.professionals.filter(p => {
            const matchesSearch = p.nome.toLowerCase().includes(searchTerm) ||
                                p.especialidade.toLowerCase().includes(searchTerm) ||
                                p.observacoes.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || p.categoria === category;
            return matchesSearch && matchesCategory;
        });
        
        // Ordenação
        this.filteredProfessionals.sort((a, b) => {
            if (sortBy === 'nome') return a.nome.localeCompare(b.nome);
            if (sortBy === 'categoria') return a.categoria.localeCompare(b.categoria);
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
        const categoryNames = {
            'medico': 'Médico',
            'pedreiro': 'Pedreiro',
            'encanador': 'Encanador',
            'eletricista': 'Eletricista',
            'servicos_gerais': 'Serviços Gerais',
            'outro': 'Outro'
        };
        
        const categoryIcons = {
            'medico': 'fa-user-md',
            'pedreiro': 'fa-hammer',
            'encanador': 'fa-faucet',
            'eletricista': 'fa-bolt',
            'servicos_gerais': 'fa-broom',
            'outro': 'fa-briefcase'
        };
        
        const stars = this.createStars(professional.nota);
        
        return `
            <div class="professional-card" data-id="${professional.id}">
                <div class="card-header">
                    <span class="card-category">
                        <i class="fas ${categoryIcons[professional.categoria]}"></i>
                        ${categoryNames[professional.categoria]}
                    </span>
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
        const categoryNames = {
            'medico': 'Médico',
            'pedreiro': 'Pedreiro',
            'encanador': 'Encanador',
            'eletricista': 'Eletricista',
            'servicos_gerais': 'Serviços Gerais',
            'outro': 'Outro'
        };
        
        const categoryIcons = {
            'medico': 'fa-user-md',
            'pedreiro': 'fa-hammer',
            'encanador': 'fa-faucet',
            'eletricista': 'fa-bolt',
            'servicos_gerais': 'fa-broom',
            'outro': 'fa-briefcase'
        };
        
        const stars = this.createStars(professional.nota);
        
        return `
            <tr data-id="${professional.id}">
                <td class="table-name">${professional.nome}</td>
                <td>
                    <span class="table-category">
                        <i class="fas ${categoryIcons[professional.categoria]}"></i>
                        ${categoryNames[professional.categoria]}
                    </span>
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
        document.getElementById('category').value = professional.categoria;
        document.getElementById('specialty').value = professional.especialidade;
        document.getElementById('phone').value = professional.telefone;
        document.getElementById('email').value = professional.email;
        document.getElementById('address').value = professional.endereco;
        document.getElementById('neighborhood').value = professional.bairro;
        document.getElementById('notes').value = professional.observacoes;
        document.getElementById('rating').value = professional.nota;
        
        this.currentRating = professional.nota;
        this.updateRatingStars();
    }

    // Resetar formulário
    resetForm() {
        document.getElementById('professionalForm').reset();
        document.getElementById('professionalId').value = '';
        this.currentRating = 0;
        this.updateRatingStars();
    }

    // Lidar com envio do formulário
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('name').value.trim(),
            categoria: document.getElementById('category').value,
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
        const categories = new Set(this.professionals.map(p => p.categoria)).size;
        
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
