const CostPayment = require('../model/CostPayment');


async function createCostPayment(req, res) {
  const { eventId, types, clientCost, isPaid } = req.body;

  // Calcul du totalToPay en additionnant les prix des types de coûts
  const totalToPay = types.reduce((total, type) => total + type.price, 0);

  try {
    const newCostPayment = await CostPayment.create({
      eventId,
      types,
      totalToPay,
      clientCost,
      isPaid
    });

    res.status(201).json(newCostPayment);
  } catch (err) {
    console.error('Erreur lors de la création des coûts et paiements :', err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création des coûts et paiements.' });
  }
}

module.exports = {
  createCostPayment
};


// Obtenir tous les cost-payments
async function getAllCostPayments(req, res) {
  try {
    const CostPayments = await CostPayment.find();
    res.json(CostPayments);
  } catch (err) {
    console.error('Erreur lors de la récupération des cost-payments :', err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des cost-payments.' });
  }
}

// Obtenir un cost-payment par son ID
async function getCostPaymentById(req, res) {
  const CostPaymentId = req.params.id;

  try {
    const CostPayment = await CostPayment.findById(CostPaymentId);
    if (!CostPayment) {
      return res.status(404).json({ error: 'cost-payment non trouvé.' });
    }
    res.json(CostPayment);
  } catch (err) {
    console.error('Erreur lors de la récupération du cost-payment :', err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du cost-payment.' });
  }
}

// Mettre à jour un cost-payment par son ID
async function updateCostPaymentById(req, res) {
  const CostPaymentId = req.params.id;
  const updatedCostPaymentData = req.body;

  try {
    const updatedCostPayment = await CostPayment.findByIdAndUpdate(CostPaymentId, updatedCostPaymentData, { new: true });
    if (!updatedCostPayment) {
      return res.status(404).json({ error: 'cost-payment non trouvé.' });
    }
    res.json(updatedCostPayment);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du cost-payment :', err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du cost-payment.' });
  }
}

// Supprimer un cost-payment par son ID
async function deleteCostPaymentById(req, res) {
  const CostPaymentId = req.params.id;

  try {
    const deletedCostPayment = await CostPayment.findByIdAndDelete(CostPaymentId);
    if (!deletedCostPayment) {
      return res.status(404).json({ error: 'cost-payment non trouvé.' });
    }
    res.json({ message: 'cost-payment supprimé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la suppression du cost-payment :', err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du cost-payment.' });
  }
}

module.exports = {
  createCostPayment,
  getAllCostPayments,
  getCostPaymentById,
  updateCostPaymentById,
  deleteCostPaymentById
}
