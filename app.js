const orderList = document.getElementById('orderList');
const addOrderBtn = document.getElementById('addOrderBtn');

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener('click', () => {
    const order = { id: orderId++, status: 'En Proceso' };
    addOrder(order);
    processOrder(order);
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.textContent = `Pedido #${order.id}: ${order.status}`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.textContent = `Pedido #${order.id}: ${status}`;
    }
}

// Función para simular la preparación de los pedidos en un tiempo aleatorio
function prepareOrder(order) {
    return new Promise((resolve) => {
        const preparationTime = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;
        setTimeout(() => {
            resolve(`Completado`);
        }, preparationTime);
    })
}


async function processOrder(order) {
    try {
        // Simular la preparación del pedido
        const status = await prepareOrder(order);
        // Actualizar el estado del pedido en la interfaz
        updateOrderStatus(order, status);
    } catch (error) {
        console.error(`Error procesando el pedido #${order.id}:`, error);
        updateOrderStatus(order, 'Error');
    }


}