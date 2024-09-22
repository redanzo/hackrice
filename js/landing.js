const $ = (query, parent = document) => parent.querySelector(query);
const $$ = (query, parent = document) => parent.querySelectorAll(query);
let grid = 0;

let data = [{
    key: 'Technology',
    value: [{
        key: 'Software: infrastructure',
        value: 1
    }, {
        key: 'Consumer: Electronics',
        value: 2
    }, {
        key: 'Semi-conductors',
        value: 3
    }, {
        key: 'Software: Applications',
        value: 4
    }]
}, {
    key: 'Financial',
    value: [{
        key: 'Credit Services',
        value: 5
    }, {
        key: 'Banks Diversified',
        value: 6
    }, {
        key: 'Insurance Diversified',
        value: 7
    }, {
        key: 'Asset Management',
        value: 8
    }]
}, {
    key: 'Industrial',
    value: [{
        key: 'Aerosapace and Defense',
        value: 9
    }, {
        key: 'Speciality Industry Machinery',
        value: 10
    }, {
        key: 'Heavy Construction Machinery',
        value: 11
    }, {
        key: 'Engineering and Construction',
        value: 12
    }]
}, {
    key: 'Energy',
    value: [{
        key: 'Oil & Gas integrated',
        value: 13
    }, {
        key: 'Oil & Gas E&P',
        value: 14
    }, {
        key: 'Oil & Gas Equipment & Services',
        value: 15
    }, {
        key: 'Renewable Energy Equipment',
        value: 16
    }]
}, {
    key: 'Healthcare',
    value: [{
        key: 'Drug Manufacturers',
        value: 17
    }, {
        key: 'Healthcare plans',
        value: 18
    }, {
        key: 'Medical Devices',
        value: 19
    }, {
        key: 'Biotechnology',
        value: 20
    }]
}, {
    key: 'Communication Services',
    value: [{
        key: 'Internet Content and Information',
        value: 21
    }, {
        key: 'Telecom services',
        value: 22
    }, {
        key: 'Entertainment',
        value: 23
    }, {
        key: 'Publishing',
        value: 24
    }]
}, {
    key: 'Consumer Cyclical',
    value: [{
        key: 'Internet Retail',
        value: 25
    }, {
        key: 'Auto-manufacturers',
        value: 26
    }, {
        key: 'Restaurants',
        value: 27
    }, {
        key: 'Travel Services',
        value: 28
    }]
}, {
    key: 'Utilities',
    value: [{
        key: 'Electrical Regulated',
        value: 29
    }, {
        key: 'Utilities Diversified',
        value: 30
    }, {
        key: 'Gas Utilities',
        value: 31
    }, {
        key: 'Water Utilities',
        value: 32
    }]
}, {
    key: 'Consumer Defensive',
    value: [{
        key: 'Discount stores',
        value: 33
    }, {
        key: 'Household',
        value: 34
    }, {
        key: 'Beverages (non-alcholic)',
        value: 35
    }, {
        key: 'Packaged foods',
        value: 36
    }]
}, {
    key: 'Real-Estate',
    value: [{
        key: 'Reit Residential',
        value: 37
    }, {
        key: 'Reit Retail',
        value: 38
    }, {
        key: 'Reit Diversified',
        value: 39
    }, {
        key: 'Reit Healthcare',
        value: 40
    }]
}]

let nav = []

data.forEach((item, index) => {
    nav.push(`<div class="option" data-id="0"`)
    if ([0, 3].includes(index)) nav.push(`style="margin-top: 325px;"`)
    else if ([5, 6, 8, 9].includes(index)) nav.push(`style="margin-top: -325px;"`)
    nav.push(`>
        <div class="label">${item.key}</div>
        <div class="table">${item.value.map(value => 
            `<div><a href="stock.html?q=${value.value}" class="stock-link" data-value="${value.value}">${value.key}</a></div>`).join('')}
        </div>
    </div>`)
})

nav.push(`<div class="option hideme" data-id="0"></div>`)
$('nav').innerHTML = nav.join('');
document.querySelector('nav > div:nth-last-child(3)').insertAdjacentHTML('beforebegin', `<div class="option hideme" data-id="0"></div>`);




$$('.option').forEach(option => {
    const row = (cells) => `<div class="row">${new Array(cells).fill(`<div class="cell"></div>`).join('')}</div>`;
    const id = +option.getAttribute('data-id');
    $(`.option[data-id="${id}"] .label`)?.setAttribute('data-id', id);
    const table = $(`.option[data-id="${id}"] .table`)
    table?.setAttribute('data-id', id);
})
