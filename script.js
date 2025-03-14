let buttons = [
    { "id": "btn1",  "text": "官网（重点）",               "url": "https://testnet.monad.xyz/", "color": "#333" },
    { "id": "btn2",  "text": "Curvance（重点）",        "url": "https://monad.curvance.com/", "color": "#333" },
    { "id": "btn3",  "text": "fantasy.top（重点）",     "url": "https://monad.fantasy.top/", "color": "#333" },
    { "id": "btn4",  "text": "Nad.fun（重点）",         "url": "https://testnet.nad.fun/", "color": "#333" },
    { "id": "btn5",  "text": "aPriori（重点）",         "url": "https://www.apr.io/", "color": "#333" },
    { "id": "btn6",  "text": "Kuru（重点）",            "url": "https://www.kuru.io/markets", "color": "#333" },
    { "id": "btn7",  "text": "rarebetsports（重点）",   "url": "https://www.rarebetsports.io/", "color": "#333" },
    { "id": "btn8",  "text": "KINTSU（重点）",          "url": "https://kintsu.xyz/", "color": "#333" },
    { "id": "btn9",  "text": "Magma（重点）",           "url": "https://www.magmastaking.xyz/", "color": "#333" },
    { "id": "btn10", "text": "Uniswap（重点）",         "url": "https://uniswap.org/", "color": "#333" },
    { "id": "btn11", "text": "Magic Eden（重点）",      "url": "https://magiceden.io/", "color": "#333" },
    { "id": "btn12", "text": "Nad Name Service（重点）", "url": "https://nad.domains/", "color": "#333" },
    { "id": "btn13", "text": "Zaros（重点）",           "url": "https://www.zaros.fi/", "color": "#333" },
    { "id": "btn14", "text": "Ammalgam（重点）",        "url": "https://ammalgam.xyz/", "color": "#333" },
    { "id": "btn15", "text": "Monadverse（重点）",      "url": "https://monadverse.land/", "color": "#333" },
    { "id": "btn16", "text": "Bean（重点）",            "url": "https://bean.exchange/", "color": "#333" },
    { "id": "btn17", "text": "Kizzy（重点）",           "url": "https://kizzy.io/", "color": "#333" },
    { "id": "btn18", "text": "Nitro Finance（重点）",   "url": "https://nitrofinance.xyz/", "color": "#333" },
    { "id": "btn19", "text": "Azaar（重点）",           "url": "https://azaar.com/", "color": "#333" }
];

const savedButtons = JSON.parse(localStorage.getItem('customButtons') || '[]');
if (savedButtons.length > 0) {
    buttons = savedButtons;
}

let displayedButtons = [];
let nextId = buttons.length ? Math.max(...buttons.map(b => parseInt(b.id.replace('btn', '')))) + 1 : 1;

function renderButtons() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    displayedButtons.forEach(btn => {
        const div = document.createElement('div');
        div.className = 'text-btn';
        div.innerText = btn.text;
        div.style.backgroundColor = btn.color; // 设置按钮背景颜色
        div.dataset.id = btn.id;
        div.onclick = function() {
            window.open(btn.url, '_blank');
        };
        div.oncontextmenu = function(e) {
            e.preventDefault();
            showEditModal(btn.id);
        };
        container.appendChild(div);
    });
}

function showAddModal() {
    document.getElementById('modal-title').innerText = '添加按钮';
    document.getElementById('edit-text').value = '';
    document.getElementById('edit-url').value = '';
    document.getElementById('edit-color').value = '#333'; // 默认颜色
    document.getElementById('delete-btn').style.display = 'none';
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('edit-modal').dataset.id = '';
}

function showEditModal(id) {
    const btn = displayedButtons.find(b => b.id === id);
    document.getElementById('modal-title').innerText = '编辑按钮';
    document.getElementById('edit-text').value = btn.text;
    document.getElementById('edit-url').value = btn.url;
    document.getElementById('edit-color').value = btn.color; // 设置当前颜色
    document.getElementById('delete-btn').style.display = 'inline';
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('edit-modal').dataset.id = id;
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function saveButton() {
    const text = document.getElementById('edit-text').value;
    const url = document.getElementById('edit-url').value;
    const color = document.getElementById('edit-color').value; // 获取选择的颜色
    if (!text || text.length > 20) {
        alert("文字不能为空且不能超过20个字！");
        return;
    }
    if (!url || !url.startsWith('http')) {
        alert("请输入有效的网址！");
        return;
    }
    const id = document.getElementById('edit-modal').dataset.id;
    const newButton = { id: id || `btn${nextId++}`, text, url, color };
    if (!id) {
        buttons.push(newButton);
        displayedButtons.push(newButton);
    } else {
        const index = buttons.findIndex(b => b.id === id);
        buttons[index] = newButton;
        const displayIndex = displayedButtons.findIndex(b => b.id === id);
        displayedButtons[displayIndex] = newButton;
    }
    localStorage.setItem('customButtons', JSON.stringify(buttons));
    renderButtons();
    closeModal();
}

function deleteButton() {
    const id = document.getElementById('edit-modal').dataset.id;
    if (id) {
        buttons = buttons.filter(btn => btn.id !== id);
        displayedButtons = displayedButtons.filter(btn => btn.id !== id);
        localStorage.setItem('customButtons', JSON.stringify(buttons));
        renderButtons();
    }
    closeModal();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    document.getElementById('save-btn').addEventListener('click', saveButton);
    document.getElementById('delete-btn').addEventListener('click', deleteButton);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    displayedButtons = [...buttons]; // 直接使用 buttons 数组的顺序
    renderButtons();
});