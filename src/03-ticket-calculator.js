/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` 
  variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that 
  the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

// Import Helper functions
const { capitalizeWord } = require("./helper-functions");

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be 
 * in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, 
 * or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` 
 *                              file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can 
 *                                       be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  const { ticketType, entrantType, extras } = ticketInfo;
  const ticket = ticketData[ticketType];
  // check if Ticket type is valid
  if (!ticket) {
    return `Ticket type '${ticketType}' cannot be found.`;
  }
  // Check if entrant type is valid
  const ticketPrice = ticket.priceInCents[entrantType];
  if (!ticketPrice) {
    return `Entrant type '${entrantType}' cannot be found.`;
  }

  // Check if any extra was selected
  if (extras.length < 1) {
    return ticketPrice;
  }

  let total = ticketPrice;

  for (const extra of extras) {
    const selectedExtra = ticketData.extras[extra];

    if (!selectedExtra) {
      return `Extra type '${extra}' cannot be found.`;
    }

    const extraPrice = selectedExtra.priceInCents[entrantType];
    total += extraPrice;
  }

  return total;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in 
 * the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it 
 * is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to 
 *       get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` 
 *                              file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that 
 *                                        can be added to the ticket. All strings should be keys under 
 *                                        the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  let total = 0;
  const tickets = [];

  for (const ticket of [...purchases]) {
    let price = calculateTicketPrice(ticketData, ticket);
    // If ticket is not valid, returns the message created by calculateTicketPrice
    if (typeof price != "number") {
      return price;
    }
    // convert price in cents to dollars
    price = price / 100;

    const { ticketType, entrantType, extras } = ticket;

    const ticketDescription = ticketData[ticketType].description;
    const entrant = capitalizeWord(entrantType);
    const priceStr = price.toFixed(2);
    let ticketInfo = "";

    if (extras.length < 1) {
      ticketInfo = `${entrant} ${ticketDescription}: \$${priceStr}`;
    } else {
      let extraDescriptions = [];
      for (const extra of extras) {
        const description = ticketData.extras[extra].description;
        extraDescriptions.push(description);
      }
      extraDescriptions = extraDescriptions.join(", ");
      ticketInfo = `${entrant} ${ticketDescription}: \$${priceStr} (${extraDescriptions})`;
    }

    total += price;
    tickets.push(ticketInfo);
  }
  const welcomeMessage = "Thank you for visiting the Dinosaur Museum!";
  const separator = "-------------------------------------------";
  const allTickets = tickets.join("\n");
  const totalStr = total.toFixed(2);
  return `${welcomeMessage}\n${separator}\n${allTickets}\n${separator}\nTOTAL: \$${totalStr}`;
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
