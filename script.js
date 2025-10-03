// Banco de dados simulado (em um sistema real, isso seria no backend)
let usersDB = JSON.parse(localStorage.getItem('realStateUsers')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('realStateLoggedInUser')) || null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateUserInterface();
    
    // Event listeners para formulários
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('cadastro-form').addEventListener('submit', handleCadastro);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});

// Atualiza a interface baseada no estado de login
function updateUserInterface() {
    const userNav = document.getElementById('user-nav');
    const loginNav = document.getElementById('login-nav');
    const loginLink = document.getElementById('login-link');
    
    if (loggedInUser) {
        userNav.style.display = 'block';
        loginNav.style.display = 'none';
        document.getElementById('user-display-name').textContent = loggedInUser.nome;
    } else {
        userNav.style.display = 'none';
        loginNav.style.display = 'block';
        loginLink.textContent = 'Login';
    }
}

// Alternar entre as abas de login e cadastro
function openAuthTab(tabName) {
    // Esconder todos os formulários
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('cadastro-form').classList.remove('active');
    
    // Remover classe active de todas as abas
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar o formulário selecionado e ativar a aba
    document.getElementById(`${tabName}-form`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Processar login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Verificar se o usuário existe
    const user = usersDB.find(u => u.email === email && u.password === password);
    
    if (user) {
        loggedInUser = user;
        localStorage.setItem('realStateLoggedInUser', JSON.stringify(user));
        updateUserInterface();
        alert('Login realizado com sucesso!');
        document.getElementById('login-form').reset();
    } else {
        alert('E-mail ou senha incorretos. Tente novamente.');
    }
}

// Processar cadastro
function handleCadastro(e) {
    e.preventDefault();
    
    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const telefone = document.getElementById('cadastro-telefone').value;
    const password = document.getElementById('cadastro-password').value;
    const confirmPassword = document.getElementById('cadastro-confirm-password').value;
    
    // Validações
    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
    }
    
    // Verificar se o usuário já existe
    if (usersDB.find(u => u.email === email)) {
        alert('Já existe uma conta com este e-mail. Tente fazer login.');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        id: Date.now(),
        nome,
        email,
        telefone,
        password
    };
    
    usersDB.push(newUser);
    localStorage.setItem('realStateUsers', JSON.stringify(usersDB));
    
    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    document.getElementById('cadastro-form').reset();
    openAuthTab('login');
}

// Processar logout
function handleLogout() {
    loggedInUser = null;
    localStorage.removeItem('realStateLoggedInUser');
    updateUserInterface();
    alert('Logout realizado com sucesso!');
}

// Solicitar aluguel de imóvel
function solicitarAluguel(propertyId) {
    if (!loggedInUser) {
        // Mostrar modal solicitando login
        document.getElementById('aluguel-modal').style.display = 'flex';
        return;
    }
    
    // Em um sistema real, aqui seria feita uma requisição para o backend
    alert(`Solicitação de aluguel para o imóvel ${propertyId} enviada com sucesso! Nossa equipe entrará em contato em breve.`);
}

// Fechar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Redirecionar para login
function redirectToLogin() {
    closeModal('aluguel-modal');
    window.location.href = '#cadastro';
    openAuthTab('login');
}
