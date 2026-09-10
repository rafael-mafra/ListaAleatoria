# 📋 Lista de Contatos do grupo Aleatórios SERPRO

Uma página web pública para gerenciar e exibir indicações de profissionais (médicos, pedreiros, encanadores, eletricistas, etc.).

## 🚀 Funcionalidades

- ✅ Cadastro de profissionais com dados completos
- ✅ **Múltiplas categorias por profissional** (ex: Pedreiro e Encanador)
- ✅ Busca dinâmica por nome, especialidade ou observações
- ✅ Filtragem por categoria
- ✅ Ordenação por nome, categoria, nota ou data de cadastro
- ✅ **Visualização em Lista (tabela) - padrão**
- ✅ **Visualização em Cards (grid) - alternativa**
- ✅ **Alternância fácil entre os modos de visualização**
- ✅ Edição e exclusão de profissionais
- ✅ Sistema de avaliação com estrelas (1-5)
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Armazenamento local (LocalStorage)
- ✅ Estatísticas atualizadas em tempo real
- ✅ Paginação com informações detalhadas

## 📁 Estrutura do Projeto

```
indicacoes-profissionais/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── app.js          # Lógica JavaScript
├── img/                # Imagens (opcional)
└── README.md           # Este arquivo
```

## 🛠️ Como Usar

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Pronto! O aplicativo está funcionando

### Opção 2: Usar com Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Hospedagem gratuita
1. Crie uma conta no [GitHub](https://github.com)
2. Crie um novo repositório
3. Faça upload dos arquivos
4. Ative o GitHub Pages em Settings > Pages

## 📱 Categorias Disponíveis

- 🏥 **Médico** - Profissionais da saúde
- 🔨 **Pedreiro** - Construção e reforma
- 🚰 **Encanador** - Hidráulica
- ⚡ **Eletricista** - Instalações elétricas
- 🧹 **Serviços Gerais** - Limpeza e outros serviços
- 💼 **Outro** - Outras categorias

## 💾 Dados

- Os dados são salvos automaticamente no **LocalStorage** do navegador
- Não é necessário servidor backend
- Para backup, exporte os dados do navegador (Ferramentas > Desenvolvedor > Application > LocalStorage)

## 🎨 Personalização

### Adicionar novas categorias
Edite o arquivo `js/app.js` e adicione novas opções no objeto `categoryNames` e `categoryIcons`.

### Alterar cores
Edite as variáveis CSS no arquivo `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Cor principal */
    --primary-hover: #1d4ed8;      /* Cor ao passar o mouse */
    --success-color: #22c55e;      /* Cor de sucesso */
    --danger-color: #ef4444;       /* Cor de perigo */
    --warning-color: #f59e0b;      /* Cor de aviso */
}
```

### Alterar itens por página
No arquivo `js/app.js`, altere a linha:

```javascript
this.itemsPerPage = 6; // Altere para o número desejado
```

## 📈 Estatísticas

O aplicativo exibe automaticamente:
- Total de profissionais cadastrados
- Média de avaliações
- Número de categorias disponíveis

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilos e design responsivo
- **JavaScript ES6+** - Lógica do aplicativo
- **Font Awesome** - Ícones
- **LocalStorage** - Armazenamento local

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Se tiver alguma dúvida ou sugestão, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade**
