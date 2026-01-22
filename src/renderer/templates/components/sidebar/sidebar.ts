export function initSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            
            // Update Sidebar
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update View
            viewSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `view-${target}`) {
                    section.classList.add('active');
                }
            });
        });
    });
}
