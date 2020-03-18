/**
 * Dodaje historię hipchata
 * Na tej stronie można zrobić sobie z tego kodu link do zakładek:
 * https://mrcoles.com/bookmarklet/
 */

const LOCAL_STORAGE_KEY = 'hipchat_' + $('.hc-groupchat-header *').html();

const removeDataAttributes = target => {
    let $target = $(target);
    $.each($target.data(), function (key) {
        let attr = 'data-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        $target.removeAttr(attr);
    });
};

const historicalPanel = $('.hc-chat-panel')
    .clone()
    .removeClass('hc-chat-panel')
    .addClass('hc-chat-panel-historical')
    .css('display', 'none')
    .css('height', '100%');

$(historicalPanel)
    .find('.hc-chat-scrollbox')
    .removeClass('hc-chat-scrollbox')
    .removeClass('message-list')
    .addClass('hc-chat-scrollbox-historical')
    .addClass('message-list-historical')
    .css('max-height', 'calc(100% - 110px)')
    .css('overflow-x', 'hidden');


$('.hc-chat-panel-left-column').append(
    '<div style="text-align:center; padding:5px 0; cursor:pointer" onclick="$(\'.hc-chat-panel-historical\').slideToggle();">' +
    '<h4>Historia (pokaż/ukryj)</h4>' +
    '</div>'
);

$('.hc-chat-panel-left-column').append(historicalPanel);

const saveAllToLocalStorage = () => {
    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify($('.hc-chat-panel > .message-list').html())
    );
};

let messages = localStorage.getItem(LOCAL_STORAGE_KEY);
if (messages) {
    $('.hc-chat-panel-historical > .message-list-historical').html(JSON.parse(messages))
} else {
    (!$("span:contains('Welcome to the ')").length) && saveAllToLocalStorage();
}

const mutationObserver = new MutationObserver(mutations => saveAllToLocalStorage());

mutationObserver.observe(document.getElementsByClassName("hc-chat-panel")[0], {
    childList: true,
    subtree: true
});

$('.hc-chat-panel-historical .scroll-wrap')
    .removeClass('scroll-wrap')
    .addClass('scroll-wrap-historical')
    .css('overflow-y', 'auto');

$('.hc-chat-panel-historical .hc-messages')
    .removeClass('hc-messages')
    .addClass('hc-messages-historical');

$('.hc-chat-panel-historical .date-block')
    .removeClass('date-block')
    .addClass('date-block-historical');

$('.hc-chat-panel-historical *').each((a, b) => removeDataAttributes(b));
