require('dotenv').config();
const { sequelize, User, Company } = require('../models');

const initDatabase = async () => {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    await sequelize.authenticate();
    console.log('✅ Conexão estabelecida!');

    console.log('🔄 Sincronizando modelos...');
    await sequelize.sync({ force: true }); // ATENÇÃO: força recriação das tabelas
    console.log('✅ Modelos sincronizados!');

    console.log('🔄 Criando dados iniciais...');

    // Criar empresa padrão
    const company = await Company.create({
      name: 'Empresa Matriz',
      tradeName: 'Workbox',
      type: 'headquarters',
      status: 'active',
      email: 'contato@workbox.com',
      phone: '(11) 99999-9999'
    });
    console.log('✅ Empresa criada:', company.name);

    // Criar usuário admin
    const admin = await User.create({
      username: 'admin',
      email: 'admin@workbox.com',
      password: 'admin123',
      fullName: 'Administrador',
      role: 'admin',
      status: 'active',
      companyId: company.id
    });
    console.log('✅ Usuário admin criado');

    // Criar usuário supervisor
    const supervisor = await User.create({
      username: 'supervisor',
      email: 'supervisor@workbox.com',
      password: 'supervisor123',
      fullName: 'Supervisor',
      role: 'supervisor',
      status: 'active',
      companyId: company.id
    });
    console.log('✅ Usuário supervisor criado');

    // Criar usuário normal
    const user = await User.create({
      username: 'user',
      email: 'user@workbox.com',
      password: 'user123',
      fullName: 'Usuário Normal',
      role: 'user',
      status: 'active',
      companyId: company.id
    });
    console.log('✅ Usuário normal criado');

    console.log('\n✅ Banco de dados inicializado com sucesso!');
    console.log('\n📋 Credenciais de acesso:');
    console.log('Admin: admin / admin123');
    console.log('Supervisor: supervisor / supervisor123');
    console.log('User: user / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
};

initDatabase();
