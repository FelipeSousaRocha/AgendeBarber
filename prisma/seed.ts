const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const imageUrl = "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"; // URL da imagem para a barbearia

    // Verifica se já existe uma barbearia criada
    const existingBarbershop = await prisma.barbershop.findFirst();
    if (existingBarbershop) {
      console.log("Já existe uma barbearia no banco de dados.");
      return;
    }

    // Criar a barbearia
    const barbershop = await prisma.barbershop.create({
      data: {
        name: "Hunos barbearia", // Nome da sua barbearia
        address: "Rua da Barbearia, 123", // Endereço da sua barbearia
        imageUrl: imageUrl, // URL da imagem da sua barbearia
      },
    });

    // Criar serviços para a barbearia
    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Barba feita com técnica e cuidado.",
        price: 40.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Penteado",
        description: "Penteado personalizado de acordo com seu estilo.",
        price: 50.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Coloração",
        description: "Coloração de cabelo profissional.",
        price: 80.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Tratamento Capilar",
        description: "Tratamento intensivo para saúde dos cabelos.",
        price: 70.0,
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      }
      // Adicione mais serviços conforme necessário
    ];

    for (const service of services) {
      await prisma.service.create({
        data: {
          name: service.name,
          description: service.description,
          price: service.price,
          barbershop: {
            connect: {
              id: barbershop.id,
            },
          },
          imageUrl: service.imageUrl
        },
      });
    }

    // Criar planos de mensalidade
    const plans = [
      {
        name: "Plano Mensal",
        price: 29.99,
        duration: "mensal",
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
      },
      {
        name: "Plano Semestral",
        price: 150.0,
        duration: "semestral",
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
      },
      {
        name: "Plano Anual",
        price: 300.0,
        duration: "anual",
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png"
      }
      // Adicione mais planos conforme necessário
    ];

    for (const plan of plans) {
      await prisma.plan.create({
        data: {
          name: plan.name,
          price: plan.price,
          duration: plan.duration,
          imageUrl: plan.imageUrl,
        },
      });
    }

    console.log("Barbearia, serviços e planos criados com sucesso!");

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar a barbearia, serviços e planos:", error);
  }
}

seedDatabase();
