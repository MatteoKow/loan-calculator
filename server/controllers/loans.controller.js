const xml2js = require('xml2js');
const ReferenceRate = require('../models/referenceRate');
const CalculatedLoan = require('../models/calculatedLoan');
const { sendMail } = require('../utils/mail');

const calculateLoan = async (req, res) => {

    try {
      const { total_installments, remaining_installments, installment_amount, initial_loan_amount, interest_rate } = req.body;
      if (
        total_installments === undefined ||
        remaining_installments === undefined ||
        installment_amount === undefined ||
        initial_loan_amount === undefined ||
        interest_rate === undefined
    ) {
        return res.status(400).json({
            message: "Wszystkie dane są wymagane!",
            status: 400
        });
    }
      const response = await fetch('https://static.nbp.pl/dane/stopy/stopy_procentowe.xml');
      const xmlData = await response.text();
      const parsedData = await xml2js.parseStringPromise(xmlData);
      const referenceRateStr = parsedData.stopy_procentowe.tabela[0].pozycja
      .find(position => position.$.id === "ref").$.oprocentowanie;

      const reference_rate = parseFloat(referenceRateStr.replace(',', '.'));

      const referenceRateEntry = {
        reference_rate: reference_rate,
        date: new Date()
      };
    
      await ReferenceRate.create(referenceRateEntry);

      if (interest_rate > reference_rate) {
        return res.status(200).json({
            message: "Oprocentowanie jest większe od stopy referencyjnej. Proces zakończony.",
            status: 200
        });
      } 
      
      const remaining_amount = (total_installments - remaining_installments) * installment_amount; 
      const new_monthly_interest_rate = reference_rate / 100 / 12; 
      
      const new_installment_amount = (remaining_amount * new_monthly_interest_rate) / 
          (1 - Math.pow(1 + new_monthly_interest_rate, -remaining_installments));
  
      if (new_installment_amount <= 0) {
        // sendMail(); wysyłanie maila
        return res.status(200).json({
            status: 200,
            message: "Nowa rata jest mniejsza lub równa zeru.",
        });
      }
      
      const loan_to_repayment = new_installment_amount * remaining_installments;

      const newLoanData = {
        initial_loan_amount,
        loan_to_repayment,
        new_installment_amount,
        remaining_installments,
        interest_rate,
        reference_rate,
        date: new Date()
      };

      await CalculatedLoan.create(newLoanData);
      

      return res.status(200).json({
          newLoanData,
          status: 200,
        });

        } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: 'Wystąpił błąd aplikacji', status: 500 });
    }
    
  };


module.exports = {calculateLoan};