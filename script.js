/*추가*/

'use strict';       /* 엄격한 문법 모드. 변수이런걸 설정하지 않으면 까다롭게 본다. 좀 더 나은 개발환경을 만들 수 있다.*/


// 스크롤에 따른 메뉴바 색상처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;        // '사각형의' '높이'를 얻어와라.
console.log(navbarHeight);
document.addEventListener('scroll', () => {     // 현재 문서에 이벤트를 추가할 것임. scroll 하면 익명함수를 실행해줘
    // console.log('이벤트가 발생되었음!');
    // console.log(window.scrollY);        // scrollY 대소문자 주의    // 스크롤의 y축 px위치정보
    // navbar.classList.add('navbar--bold');
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--bold');       // 그냥 add는 없고, classList.add 쌍으로 항상 쓰임. classList라는 클래스에 add가 있.
    }else{
        navbar.classList.remove('navbar--bold');    // 마찬가지로 속성 부여하는 클래스
    }
});

// 스크롤에 따른 메뉴바 고정
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {       // 눌렀을 때 아무 속성을 보내지 않아도 모든 속성이 e에 다 들어간다. 버튼
    // console.log(e);
    const target = e.target;    // 타겟을 가져온다.     // 타겟을 적은 이유는 각각의 link를 구별하며 가져와야되어서 사용함.
    const link = target.dataset.link;   // 타겟에서 link를 가져와서 link에 저장
    if(link == null){           // 값이 안 왔을 때를 대비한 방어 코드
        return;
    }
    //console.log(link);
    scrollIntoView(link);
})

// contact 버튼
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });        // 스크롤을 어디쪽으로 이동하라는 함수. 스무스하게 하도록 속성을 줄 수 있다. 
}

// 메뉴 높이를 조금씩 내려줘야 될듯

// const bottomToTopArrow = document.querySelector('.arrow-up');
// bottomToTopArrow.addEventListener('click', () => {
//     scrollIntoView('#home');
// })

const home = document.querySelector('.home__container');      //높이가 있는 대상을 선정
const homeHeight = home.getBoundingClientRect().height;

const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
    home.style.opacity = 1 - window.scrollY / homeHeight;   // home 부분이 살짝 투명해지며 바뀌는 효과
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});