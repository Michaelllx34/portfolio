/*추가*/

'use strict';       /* 엄격한 문법 모드. 변수이런걸 설정하지 않으면 까다롭게 본다. 좀 더 나은 개발환경을 만들 수 있다.*/


// 스크롤에 따른 메뉴바 색상처리
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;        // 'navbar'의 '사각형의' '높이'를 얻어와라.
console.log(navbarHeight);
document.addEventListener('scroll', () => {     // 현재 문서에 이벤트를 추가할 것임. scroll 하면 익명함수를 실행해줘
    // console.log('이벤트가 발생되었음!');
    // console.log(window.scrollY);        // scrollY 대소문자 주의    // 스크롤의 y축 px위치정보
    // navbar.classList.add('navbar--bold');
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--bold');       // 그냥 add라는건 없고, classList.add 항상 쌍으로 쓰임. classList라는 클래스에 add가 있.    // html에 navbar--bold 라는 클래스를 만들어 넣어라
    }else{
        navbar.classList.remove('navbar--bold');    // 마찬가지로 속성 부여하는 클래스
    }                                               // html에 navbar--bold 라는 클래스를 삭제해라
});

// 스크롤에 따른 메뉴바 고정
const navbarMenu = document.querySelector('.navbar__menu'); // navbar__menu 라는 클래스를 선택
navbarMenu.addEventListener('click', (e) => {       // 눌렀을 때 아무 속성을 보내지 않아도 모든 속성이 e에 다 들어간다. 버튼
    // console.log(e);
    const target = e.target;    // 타겟을 가져온다.     // 타겟을 적은 이유는 각각의 link를 구별하며 가져와야되어서 사용함.
    // target: 이벤트가 발생한 대상 객체    // * ?
    const link = target.dataset.link;   // 타겟에서 link를 가져와서 link에 저장
    if(link == null){           // 값이 안 왔을 때를 대비한 방어 코드
        return;
    }
    // console.log(link);
    navbarMenu.classList.remove('open');
    scrollIntoView(link);

    // const navActive = document.querySelector('.navbar__menu__item.active')
    // navActive.classList.remove('active')
    // target.classList.add('active')
})

// 모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open')
})

// contact 버튼
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
})



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


// 선택한 프로젝트 보이기
// work 카테고리에 있는 것들 가져오기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;      // filter가 있는지 확인하고 parentNode 부분 있는 이유: 스판태그가 선택되었을 때 안먹히는 경우가 있기 때문에 부모태그도 확인하는 것.(부자연스러운 경우가 있으니 그것 방지)
    if(filter == null){
        return;
    }

    const active = document.querySelector('.category__btn.selected');
    if(active != null){
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');     // active안에 다 들어 있기 떄문에 선택되어있는게 있으면 그거 날리고 내꺼 선택해라

    projectContainer.classList.add('anim-out');     // 보이고 안보이고 할 때 애니메이션 효과
    setTimeout(() => {              // 프로젝트 안에 있는 개수만큼 돈다.
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){      // 필터값이 테이터타입과 같을 때
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');      // 추가시켰던 것 다시 제거
        scrollIntoView(link);
    }, 300);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });        // 스크롤을 어디쪽으로 이동하라는 함수. 스무스하게 하도록 속성을 줄 수 있다.
    selectNavItem(navItems[sectionIds.indexOf(selector)]);  // selectedNavIndex 
}

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map((id) => document.querySelector(id));       // 안에 있는 것을 탐색하게 되고 콜백으로 id로 들어가게 된다. ()안에 마우스 갖다대면.
// console.log(sections);
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){   // 셀렉트 될 때 여기에 넣어주도록
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            console.log('y');
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            console.log(index);
            if(entry.boundingClientRect.y < 0){     // 밑으로 내리면    // 속성이라서 () 없어도 됨
                selectedNavIndex = index + 1;       // 인덱스 올려주고
            }else{                                  // 아니면
                selectedNavIndex = index - 1;       // 인덱스 내려주기
            }
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight
    ){
        selectedNavIndex = navItems.length = 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});