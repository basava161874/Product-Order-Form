document.addEventListener('DOMContentLoaded', () => {
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const addButton = document.getElementById('addButton');
    const showOrderButton = document.getElementById('showOrderButton');
    const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    const whatIsMyOrderButton = document.getElementById('whatIsMyOrderButton');
    let rowCount = 1;

    addButton.addEventListener('click', () => {
        if (rowCount < 8) {
            const lastRow = productTable.rows[productTable.rows.length - 1];
            const productSelect = lastRow.getElementsByClassName('product-select')[0];
            const quantitySelect = lastRow.getElementsByClassName('quantity-select')[0];

            if (productSelect.value && quantitySelect.value) {
                const newRow = productTable.insertRow();
                const newProductCell = newRow.insertCell(0);
                const newQuantityCell = newRow.insertCell(1);

                newProductCell.innerHTML = `
                    <select class="product-select">
                        <option value="">Choose Product</option>
                        <option value="Product 1">Product 1</option>
                        <option value="Product 2">Product 2</option>
                        <option value="Product 3">Product 3</option>
                        <!-- Add more products as needed -->
                    </select>`;
                newQuantityCell.innerHTML = `
                    <select class="quantity-select">
                        <option value="">Choose Quantity</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>`;
                rowCount++;
            } else {
                alert('Please choose both a product and a quantity.');
            }
        } else {
            alert('You can only add up to 8 products.');
        }
    });

    showOrderButton.addEventListener('click', () => {
        // Clear the order table
        while (orderTable.firstChild) {
            orderTable.removeChild(orderTable.firstChild);
        }

        for (let i = 0; i < productTable.rows.length; i++) {
            const productSelect = productTable.rows[i].getElementsByClassName('product-select')[0];
            const quantitySelect = productTable.rows[i].getElementsByClassName('quantity-select')[0];
            if (productSelect.value && quantitySelect.value) {
                const newRow = orderTable.insertRow();
                const productCell = newRow.insertCell(0);
                const quantityCell = newRow.insertCell(1);
                productCell.textContent = productSelect.value;
                quantityCell.textContent = quantitySelect.value;
            }
        }
    });

    whatIsMyOrderButton.addEventListener('click', () => {
        const orderDetails = [];
        for (let i = 0; i < orderTable.rows.length; i++) {
            const product = orderTable.rows[i].cells[0].textContent;
            const quantity = orderTable.rows[i].cells[1].textContent;
            orderDetails.push(`${product}: ${quantity}`);
        }
        const orderText = orderDetails.join(', ');

        if ('speechSynthesis' in window) {
            const msg = new SpeechSynthesisUtterance(orderText);
            window.speechSynthesis.speak(msg);
        } else {
            alert('Text-to-speech not supported in this browser.');
        }
    });
});
