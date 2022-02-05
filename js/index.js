const d = document;
let back = 1,
next = 11,
page = 1;


$(d).ready(function () {
    $('body').css({
        backgroundColor: 'rgb(70, 70, 70)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }).append($('<nav></nav>').css({
        backgroundColor: 'black',
        width: '90%',
        height: '40px',
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }).append('<button id=back></button><section id=botonera></section><button id=next></button>')).append($('<br/><br/>')).append($('<table/>').attr('id','table'));

    $('button').attr('class','btn-nav');
    $('#back').text('🡸');
    $('#next').text('🡺');
    $('#botonera').css({
        display: 'flex',
        justifyContent: 'space-around',
        width: '85%',
        color: 'white'
        
    });
    btnCambio(back, next);
    styleBtn();
    getData(page);
    
    
});

d.addEventListener('click', (e)=>{
    if (e.target.matches('#back') && back > 1) {
        eliminarBtn();
        back-=5;
        next-=5;
        btnCambio(back, next);
        styleBtn();
    }
    if (e.target.matches('#next')) {
        eliminarBtn();
        back+=5;
        next+=5;
        btnCambio(back, next);
        styleBtn();
    }
    if (e.target.matches('.btn-botonera')) {
        page = e.target.id;
        eliminarTabla();
        getData(page);
        
        
    }
})

function getData(page) {
    
    let settings = {
        url: `https://api.coingecko.com/api/v3/coins?page=${page}`,
        method: 'GET'
    }
    
    
    
    $.ajax(settings).done(function (res) {
        
        
        createTable(res);
    });
}

function btnCambio(b,n) {
            for (let i = b; i < n; i++) {
                $('<button/>').appendTo('#botonera').attr('class','btn-nav btn-botonera').attr('id',`${i}`).text(i).css({fontWeight: 'bold'})
            }
        
            
        }


function eliminarBtn() {
            while (d.querySelector('#botonera').hasChildNodes()) {
                d.querySelector('#botonera').removeChild(d.querySelector('#botonera').lastChild);
            }
        }

function styleBtn() {
            $('.btn-nav').css({
                borderRadius: '50%',
                cursor: 'pointer',
                height: '30px',
                width: '30px'
            })
        }

function createTable(res) {
    $('#table').css({
        width: '90%',

    })
    

    $('#table').append(
        $('<thead/>').attr('class','thead').append(
            $('<tr/>').append($('<th/>').text('Icon')).append(
                $('<th/>').text('Nombre Criptomoneda')).append(
                    $('<th/>').text('Precio MXN')).append(
                        $('<th/>').text('Ultima Actualización')).append(
                            $('<th/>').text('Simbolo'))))
    
    $('.thead').css({
        backgroundColor: 'rgb(34, 34, 34)',
        color: 'white',
        height: '50px',
        
    })
    $('#table').append(
        $('<tbody>').attr('id','tbody'))
    $('#tbody').css({
        backgroundColor: 'white',
        
    })
    res.forEach(el => {
        $('#tbody').append(
            $('<tr/>').append(
                $('<td/>').append(
            $('<img/>').attr({
                'src': el.image.thumb,
            }))).append(
                $('<td/>').text(el.name)).append(
                    $('<td/>').text(
                    new Intl.NumberFormat('en-ES',{style: 'currency', currency: 'MXN',minimumFractionDigits: 2}).format(
                    el.market_data.current_price.mxn).replace('MX', ''))).append(
                        $('<td/>').text(
                            new Date(el.last_updated).toLocaleString()
                        )
                    ).append(
                        $('<td/>').text(el.symbol)))
    });
    $('td').css({
        textAlign: 'center',
        
        })
    
}
function eliminarTabla() {
    let tabla = d.querySelector('#table');
    while (tabla.hasChildNodes()) {
        tabla.removeChild(tabla.lastChild)       
    }
}