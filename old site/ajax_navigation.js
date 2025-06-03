/**
 * AJAX Navigation and Form Handler
 * Versão: 2.0
 * Data: 20/05/2025
 */

$(document).ready(function() {
    // ======= NAVEGAÇÃO AJAX =======
    
    // Intercepta cliques nos links do menu
    $('.wsite-menu-item').click(function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        
        var pageUrl = $(this).attr('href');
        var pageName = pageUrl.split('/').pop().replace('.html', '');
        
        // Não faz nada se for a página atual
        if (pageUrl === window.location.pathname) return;
        
        // Mostra indicador de carregamento
        $('body').append('<div id="loading-indicator" style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.7); color:white; padding:20px; border-radius:10px; z-index:9999;">Carregando...</div>');
        
        // Se for a página de presença, carrega o formulário diretamente
        if (pageName === 'presence' || pageUrl.includes('presence.html')) {
            loadPresenceForm();
            
            // Atualiza a URL sem recarregar a página
            history.pushState(null, null, pageUrl);
            
            // Atualiza a classe "active" no menu
            $('.wsite-menu-item-wrap').removeClass('active');
            $(this).parent().addClass('active');
            
            // Remove indicador de carregamento
            $('#loading-indicator').remove();
            
            return;
        }
        
        // Para outras páginas, carrega via AJAX normalmente
        $.ajax({
            url: pageUrl,
            cache: false,
            timeout: 8000,
            success: function(data) {
                try {
                    var tempDOM = $('<div>').html(data);
                    var newContent = tempDOM.find('.page-content').html();
                    
                    if (newContent) {
                        $('.page-content').html(newContent);
                        
                        // Atualiza a URL sem recarregar a página
                        history.pushState(null, null, pageUrl);
                        
                        // Atualiza a classe "active" no menu
                        $('.wsite-menu-item-wrap').removeClass('active');
                        $('a[href="' + pageUrl + '"]').parent().addClass('active');
                        
                        // Reinicializa scripts se necessário
                        reinitializeScripts();
                    } else {
                        console.error('Conteúdo não encontrado na página carregada');
                        window.location.href = pageUrl; // Fallback para navegação normal
                    }
                } catch (error) {
                    console.error('Erro ao processar conteúdo AJAX:', error);
                    window.location.href = pageUrl; // Fallback para navegação normal
                }
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
                window.location.href = pageUrl; // Fallback para navegação normal
            },
            complete: function() {
                // Remove indicador de carregamento
                $('#loading-indicator').remove();
            }
        });
    });
    
    // ======= FORMULÁRIO DE PRESENÇA =======
    
    // Função para carregar o formulário de presença
    function loadPresenceForm() {
        // HTML do formulário de presença com z-index elevado para garantir interatividade
        var formHTML = `
            <div class="presence-form-container" style="position: relative; z-index: 1000; max-width: 600px; margin: 0 auto; padding: 20px; background: rgba(255, 255, 255, 0.95); border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
                <form id="rsvp-form">
                    <h2 style="text-align: center; margin-bottom: 1.5rem; color: #333; font-family: 'Oswald', sans-serif;">Confirme sua presença!</h2>
                    <input type="text" name="nome" placeholder="Nome completo" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border-radius: 0.5rem; border: 1px solid #ccc; font-size: 1rem; position: relative; z-index: 1001;" />
                    <input type="email" name="email" placeholder="Seu e-mail" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border-radius: 0.5rem; border: 1px solid #ccc; font-size: 1rem; position: relative; z-index: 1001;" />
                    <select name="presenca" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border-radius: 0.5rem; border: 1px solid #ccc; font-size: 1rem; position: relative; z-index: 1001;">
                        <option value="">Você vai à formatura?</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    <button type="submit" style="width: 100%; padding: 0.8rem 1rem; background: #2e7d32; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; font-weight: bold; transition: background-color 0.3s; position: relative; z-index: 1001;">Confirmar presença</button>
                    <div id="mensagem" style="margin-top: 1.5rem; font-weight: bold; text-align: center; color: #2e7d32;"></div>
                </form>
            </div>
        `;
        
        // Substitui o conteúdo do banner pelo formulário
        $('#banner .wsite-section-elements').html(formHTML);
        
        // Inicializa o manipulador de eventos do formulário
        initFormHandler();
        
        console.log('Formulário de presença carregado e inicializado');
    }
    
    // Função para inicializar o manipulador de eventos do formulário
    function initFormHandler() {
        // Remove qualquer handler anterior para evitar duplicação
        $(document).off('submit', '#rsvp-form');
        
        // Adiciona o novo handler
        $(document).on('submit', '#rsvp-form', function(e) {
            e.preventDefault();
            console.log('Formulário enviado');
            
            // URL do Google Apps Script Web App
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKHdUQGCRgYbL8P2nTnhrPhuzG-wP_85_xWWUrEIMpyPdH5rUZPS3XPkdyerGMrLepow/exec";
            
            // Obter os dados do formulário
            const nome = $('[name="nome"]').val();
            const email = $('[name="email"]').val();
            const presenca = $('[name="presenca"]').val();
            
            if (!nome || !email || !presenca) {
                $('#mensagem').text("Por favor, preencha todos os campos.");
                return;
            }
            
            // Mostrar mensagem de carregamento
            $('#mensagem').text("Enviando...");
            
            // Desabilitar o botão durante o envio
            $('#rsvp-form button').prop('disabled', true).css('opacity', '0.7');
            
            // Preparar os dados para envio
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('email', email);
            formData.append('presenca', presenca);
            
            // Enviar os dados usando fetch
            fetch(SCRIPT_URL, {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta da rede não foi ok');
                }
                return response.json();
            })
            .then(data => {
                $('#mensagem').text("Obrigado! Sua resposta foi enviada com sucesso.");
                $('#rsvp-form')[0].reset();
            })
            .catch(error => {
                console.error('Erro:', error);
                $('#mensagem').text("Houve um erro ao enviar. Tente novamente.");
            })
            .finally(() => {
                // Reabilitar o botão após o envio
                $('#rsvp-form button').prop('disabled', false).css('opacity', '1');
            });
        });
        
        // Garantir que os campos sejam clicáveis
        $(document).on('click', '#rsvp-form input, #rsvp-form select, #rsvp-form button', function(e) {
            e.stopPropagation();
        });
    }
    
    // ======= FUNÇÕES AUXILIARES =======
    
    // Função para reinicializar scripts após carregamento AJAX
    function reinitializeScripts() {
        // Reinicializa contagem regressiva se existir
        if (typeof initCountdown === 'function') {
            initCountdown();
        }
        
        // Reinicializa outros scripts específicos da página
        if (typeof initPageSpecific === 'function') {
            initPageSpecific();
        }
    }
    
    // Lidar com o botão voltar do navegador
    window.addEventListener('popstate', function(e) {
        var currentPath = window.location.pathname;
        
        // Recarrega a página atual via AJAX
        $.ajax({
            url: currentPath,
            success: function(data) {
                var tempDOM = $('<div>').html(data);
                var newContent = tempDOM.find('.page-content').html();
                
                if (newContent) {
                    $('.page-content').html(newContent);
                    
                    // Atualiza a classe "active" no menu
                    $('.wsite-menu-item-wrap').removeClass('active');
                    $('a[href="' + currentPath + '"]').parent().addClass('active');
                    
                    // Reinicializa scripts se necessário
                    reinitializeScripts();
                } else {
                    // Fallback: recarrega a página normalmente
                    window.location.reload();
                }
            },
            error: function() {
                // Fallback: recarrega a página normalmente
                window.location.reload();
            }
        });
    });
    
    // Inicialização: verifica se estamos na página de presença
    if (window.location.pathname.includes('presence.html')) {
        loadPresenceForm();
    }
});
