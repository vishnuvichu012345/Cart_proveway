document.addEventListener('DOMContentLoaded', () => {
    const pricingOptionsData = [
        {
            units: 1,
            currentPrice: "$10.00 USD",
            originalPrice: "$24.00 USD",
            discount: "10% Off",
            popular: false
        },
        {
            units: 2,
            currentPrice: "$18.00 USD",
            originalPrice: "$24.00 USD",
            discount: "20% Off",
            popular: true
        },
        {
            units: 3,
            currentPrice: "$24.00 USD",
            originalPrice: "$24.00 USD",
            discount: "30% Off",
            popular: false
        }
    ];

    const pricingOptionsContainer = document.querySelector('.pricing-options-container');
    const totalPriceElement = document.querySelector('.total-price');

    function updateSelectedOption(selectedOption) {
        const pricingOptions = document.querySelectorAll('.pricing-option');
        pricingOptions.forEach(option => {
            option.classList.remove('selected');
            option.querySelector('.option-selectors').classList.add('hidden');
        });
        
        selectedOption.classList.add('selected');
        selectedOption.querySelector('.option-selectors').classList.remove('hidden');

        const units = selectedOption.dataset.units;
        const price = units === '2' ? '18.00' : units === '1' ? '10.00' : '24.00';
        totalPriceElement.textContent = `Total: $${price} USD`;
    }

    function createSizeSelectors(units) {
        let sizeSelectorsHTML = '';
        for (let i = 1; i <= units; i++) {
            sizeSelectorsHTML += `
                <div class="size-row">
                    <span>#${i}</span>
                    <select id="size-${units}-${i}" class="size-select">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </div>
            `;
        }
        return sizeSelectorsHTML;
    }

    function createColorSelectors(units) {
        let colorSelectorsHTML = '';
        for (let i = 1; i <= units; i++) {
            colorSelectorsHTML += `
                <div class="color-row">
                    <select id="color-${units}-${i}" class="color-select">
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Red">Red</option>
                    </select>
                </div>
            `;
        }
        return colorSelectorsHTML;
    }

    function createPricingOption(optionData) {
        const option = document.createElement('div');
        option.className = 'pricing-option';
        option.setAttribute('data-units', optionData.units);
    
        option.innerHTML = `
            <div class="option-header">
                <div class="unit-selector">
                    <div class="radio-button"></div>
                    <span class="unit-text">${optionData.units} Unit${optionData.units > 1 ? 's' : ''}</span>
                    <span class="discount-tag">${optionData.discount}</span>
                </div>
                <div class="price-info">
                    <span class="current-price">${optionData.currentPrice}</span>
                    <span class="original-price">${optionData.originalPrice}</span>
                </div>
            </div>
            ${optionData.popular ? '<span class="popular-tag">MOST POPULAR</span>' : ''}
            <div class="standard-price-label">Standard Price</div> 
            <div class="option-selectors hidden">
                <div class="select-wrapper">
                    <label for="size-${optionData.units}-1">Size</label>
                    <div class="size-selectors">
                        ${createSizeSelectors(optionData.units)}
                    </div>
                </div>
                <div class="select-wrapper">
                    <label for="color-${optionData.units}-1">Color</label>
                    <div class="color-selectors">
                        ${createColorSelectors(optionData.units)}
                    </div>
                </div>
            </div>
        `;
    
        option.addEventListener('click', () => {
            updateSelectedOption(option);
        });
    
        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                updateSelectedOption(option);
            }
        });
    
        // Add tabindex for keyboard navigation
        option.setAttribute('tabindex', '0');
    
        return option;
    }
    

    // Loop through the pricing options data and create the options
    pricingOptionsData.forEach(optionData => {
        const optionElement = createPricingOption(optionData);
        pricingOptionsContainer.appendChild(optionElement);
    });

    // Set the default selected option (2 units)
    updateSelectedOption(pricingOptionsContainer.children[1]);
});
