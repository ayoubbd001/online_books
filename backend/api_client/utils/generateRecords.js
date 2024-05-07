export default async function generateData(Client, Emprunt, Livre) {
  try {
    // Generate 10 client records
    const clientRecords = [];
    for (let i = 0; i < 10; i++) {
      const client = await Client.create({
        firstname: `Client${i + 1}`,
        lastname: `Lastname${i + 1}`,
        email: `client${i + 1}@example.com`,
        phone: `+12345678${i}`,
      });
      clientRecords.push(client);
    }

    // Generate 10 livre records
    const livreRecords = [];
    for (let i = 0; i < 10; i++) {
      const livre = await Livre.create({
        code: 1000 + i,
        titre: `Livre ${i + 1}`,
        description: `Description for Livre ${i + 1}`,
        auteur: `Author ${i + 1}`,
      });
      livreRecords.push(livre);
    }

    // Generate 10 emprunt records related to existing client and livre records
    for (let i = 0; i < 10; i++) {
      await Emprunt.create({
        client: clientRecords[i % clientRecords.length]._id, // Ensure client ID is unique
        livre: livreRecords[i % livreRecords.length]._id, // Ensure livre ID is unique
        dateEmprunt: new Date(),
        dateRetour: null,
      });
    }

    console.log("Data generated successfully");
  } catch (error) {
    console.error("Error generating data:", error);
  }
}
