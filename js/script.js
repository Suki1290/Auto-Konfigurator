document.addEventListener("DOMContentLoaded", function() {
    const productSelect = document.getElementById("product-select");
    const productProperties = document.getElementById("product-properties");
    const productPrice = document.getElementById("product-price");
    const generateOfferButton = document.getElementById("generate-offer");
    const buyButton = document.getElementById("buy");
    const shoppingBasket = [];
    const deleteButton = document.getElementById("delete");
    const deleteItems = document.getElementById("delete-items");

    

    // Beispielautos mit Eigenschaften und Preisen
    const cars = {
        car1: {
            name: "Auto 1",
            properties: {
                Farbe: ["Rot", "Blau", "Grün"],
                Motorgröße: ["Klein", "Mittel", "Groß"],
                Ausstattung: ["Basis", "Standard", "Luxus"]
            },
            prices: {
                "Rot|Klein|Basis": 20000,
                "Rot|Klein|Standard": 21000,
                "Rot|Klein|Luxus": 22000,
                "Rot|Mittel|Basis": 23000,
                "Rot|Mittel|Standard": 24000,
                "Rot|Mittel|Luxus": 25000,
                "Rot|Groß|Basis": 26000,
                "Rot|Groß|Standard": 27000,
                "Rot|Groß|Luxus": 28000,

                "Blau|Klein|Basis": 17000,
                "Blau|Klein|Standard": 18000,
                "Blau|Klein|Luxus": 19000,
                "Blau|Mittel|Basis": 20000,
                "Blau|Mittel|Standard": 21000,
                "Blau|Mittel|Luxus": 22000,
                "Blau|Groß|Basis": 23000,
                "Blau|Groß|Standard": 24000,
                "Blau|Groß|Luxus": 25000,

                "Grün|Klein|Basis": 15000,
                "Grün|Klein|Standard": 16000,
                "Grün|Klein|Luxus": 17000,
                "Grün|Mittel|Basis": 18000,
                "GrünMittel|Standard": 19000,
                "Grün|Mittel|Luxus": 20000,
                "Grün|Groß|Basis": 21000,
                "Grün|Groß|Standard": 22000,
                "Grün|Groß|Luxus": 23000,
                // Füge weitere Kombinationen für Auto 1 hinzu
            }
        },
        car2: {
            name: "Auto 2",
            properties: {
                Farbe: ["Schwarz", "Weiß"],
                Motorgröße: ["klein", "Mittel", "Groß"],
                Ausstattung: ["Basis", "Standard", "Luxus"]
            },
            prices: {
                "Schwarz|klein|Basis": 26000,
                "Schwarz|klein|Standard": 7000,
                "Schwarz|klein|Luxus": 28000,
                "Schwarz|Mittel|Basis": 29000,
                "Schwarz|Mittel|Standard": 30000,
                "Schwarz|Mittel|Luxus": 31000,
                "Schwarz|Groß|Basis": 32000,
                "Schwarz|Groß|Standard": 33000,
                "Schwarz|Groß|Luxus": 34000,

                "Weiß|klein|Basis": 24000,
                "Weiß|klein|Standard": 25000,
                "Weiß|klein|Luxus": 26000,
                "Weiß|Mittel|Basis": 27000,
                "Weiß|Mittel|Standard": 28000,
                "Weiß|Mittel|Luxus": 29000,
                "Weiß|Groß|Basis": 30000,
                "Weiß|Groß|Standard": 31000,
                "Weiß|Groß|Luxus": 32000,
                // Füge weitere Kombinationen für Auto 2 hinzu
            }
        }
        // Füge weitere Autos hinzu
    };

      // Funktion zum Aktualisieren der Produktdetails
      function updateProductProperties() {
        const selectedCar = cars[productSelect.value];
        productProperties.innerHTML = "";

        for (const prop in selectedCar.properties) {
            const propertyLabel = document.createElement("label");
            propertyLabel.textContent = prop + ": ";
            const propertySelect = document.createElement("select");
            propertySelect.id = prop;

            selectedCar.properties[prop].forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                propertySelect.appendChild(optionElement);
            });

            productProperties.appendChild(propertyLabel);
            productProperties.appendChild(propertySelect);
        }
    }

    // Funktion zum Berechnen des Preises und Generieren des Angebots
    function generateOffer() {
        const selectedCar = cars[productSelect.value];
        let totalPrice = 0;

        // Kombinieren Sie die ausgewählten Optionen zu einem eindeutigen Schlüssel
        const selectedOptions = Object.keys(selectedCar.properties).map(prop => {
            return document.getElementById(prop).value;
        });
        const selectedKey = selectedOptions.join('|');

        const price = selectedCar.prices[selectedKey];
        totalPrice = price || 0;

        productPrice.textContent = totalPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
    }

    // Funktion zum Hinzufügen des ausgewählten Produkts zum Warenkorb
    function addToBasket() {
        const selectedCar = cars[productSelect.value];
        const selectedOptions = Object.keys(selectedCar.properties).map(prop => {
            return document.getElementById(prop).value;
        });
        const selectedKey = selectedOptions.join('|');
        const price = selectedCar.prices[selectedKey];
        
        if (price > 0) {
            // Füge das ausgewählte Produkt zum Warenkorb hinzu
            shoppingBasket.push({
                car: selectedCar.name,
                options: selectedOptions,
                price: price
            });
            
            // Aktualisiere die Warenkorb-Anzeige
            updateBasketDisplay();
        }
    }

    function updateBasketDisplay() {
        const basketItems = document.getElementById("basket-items");
        basketItems.innerHTML = "";
    
        shoppingBasket.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.car} (${item.options.join(', ')}) - ${item.price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}`;
            basketItems.appendChild(itemDiv);
    
            // Füge Gesamtpreis hinzu
            if (item === shoppingBasket[shoppingBasket.length - 1]) {
                const totalPriceDiv = document.createElement("div");
                totalPriceDiv.textContent = `Gesamtpreis: ${shoppingBasket.reduce((sum, item) => sum + item.price, 0).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}`;
                totalPriceDiv.style.fontWeight = "bold";
                basketItems.appendChild(totalPriceDiv);
            }
        });
    
        // Füge Löschfunktion hinzu
        deleteItems.innerHTML = "";
        shoppingBasket.forEach(item => {
            const deleteCheckbox = document.createElement("input");
            deleteCheckbox.type = "checkbox";
            deleteCheckbox.value = item.car;
            deleteItems.appendChild(deleteCheckbox);
            const deleteLabel = document.createElement("label");
            deleteLabel.textContent = `Auswahl löschen für ${item.car}`;
            deleteItems.appendChild(deleteLabel);
            deleteItems.appendChild(document.createElement("br"));
        });
    }

    // Funktion zum Löschen ausgewählter Elemente aus dem Warenkorb
    function deleteSelectedItems() {
        const checkboxes = deleteItems.querySelectorAll("input[type='checkbox']:checked");

        checkboxes.forEach(checkbox => {
            const carName = checkbox.value;
            const indexToDelete = shoppingBasket.findIndex(item => item.car === carName);

            if (indexToDelete !== -1) {
                shoppingBasket.splice(indexToDelete, 1);
            }
        });

        // Aktualisieren Sie die Warenkorb-Anzeige nach dem Löschen
        updateBasketDisplay();
    }
       

    

    // Event-Handler für das Löschen aus dem Warenkorb
    deleteButton.addEventListener("click", deleteSelectedItems);

    // Event-Handler für Änderungen in der Produktauswahl
    productSelect.addEventListener("change", updateProductProperties);

    // Event-Handler für das Generieren des Angebots
    generateOfferButton.addEventListener("click", generateOffer);

    // Event-Handler für das Hinzufügen zum Warenkorb
    buyButton.addEventListener("click", addToBasket);
    
    // Event-Handler für den "Zahlungspflichtig bestellen" Button
const checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", function() {
    // Hier können Sie die URL festlegen, zu der Sie den Benutzer weiterleiten möchten
    const checkoutURL = "checkout.html";

    // Führen Sie die Weiterleitung durch
    window.location.href = checkoutURL;
});


    // Initialisierung
    updateProductProperties();
});