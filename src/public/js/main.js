// Handle show side menu
const toggleSideBar = document.getElementsByClassName('side-menu-toggle')[0];
const menuMobile = document.getElementsByClassName('mobile-nav')[0];
const blackDrop = document.getElementsByClassName('black-drop')[0];

toggleSideBar.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    blackDrop.classList.toggle('open');
});

blackDrop.addEventListener('click', function () {
    menuMobile.classList.toggle('open');
    blackDrop.classList.toggle('open');
});

// handle show form
if ($('.form-start__wrapper')) {
    const formStartWrapper = $('.form-start__wrapper');
    const formStart = $('.form-start');

    formStartWrapper.on('click', function () {
        formStartWrapper.toggle('show-form');
    });

    formStart.on('click', function (e) {
        e.stopPropagation();
    });

    if ($('.form-leave')) {
        const formLeave = $('.form-leave');

        formLeave.on('click', function (e) {
            e.stopPropagation();
        });
    }
}

// handle picker date
if ($('input[name="daysLeave"]')) {
    $(function () {
        $('input[name="daysLeave"]').daterangepicker({
            timePicker: true,
            startDate: moment(),
            endDate: moment(),
        });
    });
}

//  handle submit form select month 'reference view'
if ($('.form-select-month')) {
    $('.select-month').on('change', function () {
        $('.form-select-month').submit();
    });
}
