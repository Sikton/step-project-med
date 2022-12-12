class Modal {
    constructor() {
        this.btn = document.querySelector('.btn__login');
        this.loginBtn = document.querySelector('.header-btn__delete');
        this.createVisit = document.querySelector('.create-visit');
        this.modal = document.getElementById('myModal');
        this.closeModal = document.querySelector('.close-modal');
        this.email = document.querySelector('.email__login');
        this.password = document.querySelector('.password__login');
        this.btnPush = document.querySelector('.btn-push');
        this.wrongEmail = document.querySelector('.wrong-email');
        this.sectionFilter = document.querySelector('.section__filter');
    }

    checkAuthorization() {
        const token = '825217a0-e755-483d-bfea-a9067600a2f3';
        if (localStorage.getItem('token') === token) {
            this.createVisit.style.display = 'block';
            this.sectionFilter.style.display = 'block';
            this.loginBtn.remove();
        }
    }

    getModalWindow() {
        this.btn.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
    }

    login() {
        this.btnPush.addEventListener('click', async (e) => {
            e.preventDefault();
            const res = await fetch(
                'https://ajax.test-danit.com/api/v2/cards/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email.value,
                        password: this.password.value,
                    }),
                }
            );
            if (res.ok) {
                this.createVisit.style.display = 'block';
                this.loginBtn.remove();
                this.modal.style.display = 'none';
                this.sectionFilter.style.display = 'block';
                localStorage.setItem('token', '825217a0-e755-483d-bfea-a9067600a2f3');
            } else {
                this.wrongEmail.style.display = 'block';
            }
        });
    }

    render() {
        this.checkAuthorization();
        this.getModalWindow();
        this.login();
    }
}

export default Modal;
