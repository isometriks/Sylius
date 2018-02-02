(function ( $ ) {
    'use strict';

    var $options;
    var optionNames;

    $.fn.extend({
        variantPrices: function () {
            if ($('#sylius-variants-pricing').length > 0) {
                $options = $('#sylius-product-adding-to-cart select[data-option]');
                optionNames = $options.map(function(){ return $(this).data('option'); }).toArray();

                handleProductOptionsChange();
                disableOptions();
            } else if ($("#sylius-product-variants").length > 0) {
                handleProductVariantsChange();
            }
        }
    });

    function disableOptions()
    {
        var selector = '';
        var lastOptionName;

        for (var i=0; i < optionNames.length; i++) {
            var currentOptionName = optionNames[i];
            var currentOptionValues = getUniqueValues(lastOptionName ? selector : '[data-' + currentOptionName+']', currentOptionName);

            getOptionElement(currentOptionName)
                .find('option')
                .removeAttr('disabled')
                .show()
                .each(function() {
                    if (currentOptionValues.indexOf($(this).val()) === -1) {
                        $(this)
                            .attr('disabled', 'disabled')
                            .hide()
                        ;

                        // Need to unselected if it gets hidden, and is already selected
                        if ($(this).is(':selected')) {
                            $(this).parent().find('option:not(:disabled):eq(0)').prop('selected', true);
                        }
                    }
                });

            selector += '[data-' + currentOptionName + '="' + getOptionValue(currentOptionName) + '"]';
            lastOptionName = currentOptionName;
        }
    }

    function getOptionElement(optionName)
    {
        return $('#sylius-product-adding-to-cart select[data-option=' + optionName + ']');
    }

    function getOptionValue(optionName)
    {
        return getOptionElement(optionName).val();
    }

    function getUniqueValues(selector, optionName)
    {
        var values = {};

        $('#sylius-variants-pricing').find(selector).each(function() {
            values[$(this).data(optionName)] = true;
        });

        return Object.keys(values);
    }

    function handleProductOptionsChange() {
        $('[name*="sylius_add_to_cart[cartItem][variant]"]').on('change', function() {
            var $selector = '';
            disableOptions();

            $('#sylius-product-adding-to-cart select[data-option]').each(function() {
                var option = $(this).find('option:selected').val();
                $selector += '[data-' + $(this).attr('data-option') + '="' + option + '"]';
            });

            var $price = $('#sylius-variants-pricing').find($selector).attr('data-value');

            if ($price !== undefined) {
                $('#product-price').text($price);
                $('button[type=submit]').removeAttr('disabled');
            } else {
                $('#product-price').text($('#sylius-variants-pricing').attr('data-unavailable-text'));
                $('button[type=submit]').attr('disabled', 'disabled');
            }
        });
    }

    function handleProductVariantsChange() {
        $('[name="sylius_add_to_cart[cartItem][variant]"]').on('change', function() {
            var $price = $(this).parents('tr').find('.sylius-product-variant-price').text();
            $('#product-price').text($price);
        });
    }
})( jQuery );