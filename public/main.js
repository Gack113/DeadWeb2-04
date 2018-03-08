$('tbody').on('click','tr .delete',(e)=>{
    e.preventDefault()
    var id = $(e.target).parents('tr').children("td:first").text()
    var start = parseInt($('.page-item.btw:nth-last-child(2) .page-link').text() - 1)*5
    $.ajax({
        url: 'api/categories/' + id,
        type: 'delete',
        success: (res)=>{
            $('#total-rows').text(parseInt($('#total-rows').text()) - 1)
            update(start,5)
            $('.page-item.btw:nth-last-child(2)').trigger('click')
        }
    })
})

$('tbody').on('click','tr .edit',(e)=>{
    var id = $(e.target).parents('tr').children("td:first").text()
    $('#catid').val(id)
    $.ajax({
        url: 'api/categories/' + id,
        type: 'get',
        success: (res)=>{
            $('#name').val(res[0].CatName)
        }
    })
})

$('#save').on('click',(e)=>{
    e.preventDefault()
    var name = $('#name').val()
    var id = $('#catid').val()
    var method = id == ''?'post':'put'
    var start = parseInt($('.page-item.btw:nth-last-child(2) .page-link').text()- 1)*5
    $.ajax({
        url: 'api/categories/' + id,
        type: method,
        data: {name},
        success: (res)=>{
            $('#total-rows').text(parseInt($('#total-rows').text()) + 1)
            update(start,5)
            $('.page-item.btw:nth-last-child(2)').trigger('click')
        }
    })
})

$('.page-item.btw').on('click',function(){
    $('.page-item.btw.active').removeClass('active')
    $(this).addClass('active')
    if($('.page-item.btw.active').is(':nth-child(2)')){
        $('#prev').addClass('disabled')
        $('#next').removeClass('disabled')
    }
    if($('.page-item.btw.active').is(':nth-last-child(2)')){
        $('#next').addClass('disabled')
        $('#prev').removeClass('disabled')
    }
    var start = parseInt($('.page-item.btw.active .page-link').text()- 1)*5
    $('#curremt-page').text(' ' + $('.page-item.btw.active .page-link').text())
    update(start,5)
})

$('ul').on('click','#prev',()=>{
    if(!$('.page-item.btw.active').is(':nth-child(2)'))
        $('.page-item.btw.active').prev().trigger('click')
})

$('ul').on('click','#next',()=>{
    if(!$('.page-item.btw.active').is(':nth-last-child(2)'))
        $('.page-item.btw.active').next().trigger('click')
})

var update = (start = 0,limit = 0)=>{
    $.ajax({
        url: 'api/categories',
        type: 'get',
        data: {start,limit},
        success: (res)=>{
            $('tbody').html('')
            $('#catid').val('')
            $('#name').val('')
            $('#num-rows').text(Object.keys(res).length)
            $.each(res,(index,value)=>{
                $('tbody').append(
                    '<tr>'+
                        '<td>'+
                            value.CatID +
                        '</td>'+
                        '<td>'+
                            value.CatName +
                        '</td>'+
                        '<td>'+
                            '<a class="edit" href="#form-modal" data-toggle="modal">'+
                                '<i class="fas fa-edit" data-toggle="tooltip" title="Edit">'+'</i>'+
                            '</a>'+
                            '<a class="delete" href="#">'+
                                '<i class="fas fa-trash" data-toggle="tooltip" title="Delete">'+'</i>'+
                            '</a>'+
                        '</td>'+
                    '</tr>'
                )
            })
        }
    })
}

