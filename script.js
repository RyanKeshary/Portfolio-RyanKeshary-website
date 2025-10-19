// Email copy functionality with mobile support
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.getElementById('emailLink');
    const notification = document.getElementById('copyNotification');
    
    if (emailLink && notification) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function() {
                    showNotification();
                }).catch(function(err) {
                    // Fallback for mobile/older browsers
                    fallbackCopyText(email);
                });
            } else {
                // Fallback for browsers without clipboard API
                fallbackCopyText(email);
            }
        });
    }
    
    function fallbackCopyText(text) {
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = '0';
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        textarea.style.opacity = '0';
        
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification();
            }
        } catch (err) {
            console.error('Failed to copy email: ', err);
        }
        
        document.body.removeChild(textarea);
    }
    
    function showNotification() {
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
});