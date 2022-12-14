# NextJS Tutorial

---

## Start NextJS

```
npx create-next-app
(my-app-name)
```

---

## Difference between Library and Framework

### Library

- 개발자가 프로그램을 가져다 쓴다.
- 메서드를 호출하면 사용자가 제어할 수 있다.
- 사용자가 파일 이름이나 구조 등을 정하고 모든 결정을 내릴 수 있다.

### Framework

- 개발자의 코드를 프로그램이 불러온다.
- 프레임워크가 사용자를 호출한다.
- 파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따른다.

---

## NextJs Intro

### pages

- pages 폴더 안에 필요한 파일을 url 이름을 가져다가 만들면 된다. => 파일명에 따라 route가 결정된다.
- 컴포넌트의 이름은 중요하지 않다. 파일의 명이 중요하다.
- 반드시 default로 export 해야된다.
- 예외사항
  - 앱의 홈은 기본적으로 **index.js** 이다.

---

## Static Pre-Rendering

### CSR vs SSR

- CSR(Client Side Rendering)

  - 브라우저가 유저가 보는 UI를 만드는 모든 것을 행함.
  - 브라우저가 HTML을 가져올 때 비어있는 div로 가져온다.
  - 이후 브라우저가 자바스크립트를 가져옴.

- SSR(Server Side Rendering)
  - HTML이 실제로 적용된다.
  - 초기 상태로 pre-rendering 된다.
  - 자바스크립트가 비활성화 되어도 작동은 하지 않을 지언정 화면에 앱의 모습이 나타나 볼 수 는 있다.

---

## Routing

```
<a href="/">Home</a>
```

- a 태그로 링크를 연결시켜주면 안된다.
  - a 태그는 새로고침을 하게 한다.

```
import Link from "next/link";

<Link href="/">
  <a>Home</a>
</Link>
```

- nextjs에서 제공하는 Link를 사용해야 한다.
- 하지만 Link에는 경로 외의 아무 것도 적용 시킬 수 없기에 필요한 스타일은 a 태그에 적용 시킨다.

```
import {useRouter} from "next/router";

const router = useRouter();

<Link href="/>
  <a style={{color: router.pathname === "/" ? "red" : "blue"}}>Home</a>
</Link>
```

- nextjs에서 제공하는 useRouter 함수를 이용해 현재 경로에 대한 정보를 얻을 수 있다.

---

## CSS

1. CSS Modules

   - 관련 module.css 파일을 만들어준다.
   - className은 랜덤한 text가 붙어서 만들어 진다.

     ```
     import styles from "파일명.module.css";

      // className이 하나일 때
     <a className={router.pathname === "/" styles.active : ""}>Home</a>

     // 둘 이상일 때
     <a className={[styles.link,router.pathname === "/" styles.active : ""].join(" ")}>Home</a>

     혹은,
     <a className={`${styles.link} ${router.pathname === "/" styles.active : ""}`}>Home</a>
     ```

2. **Styles JSX**

   ```
   <style jsx>{`
    nav {
      background-color: tomato;
    }
   `}</style>
   ```

   - style 태그를 사용한 스타일링
   - jsx props를 적용한다.
   - style 태그 사이에 중괄호를 넣고 그 안에 백틱을 넣고 일반 CSS 작성법을 사용하면 된다.
   - 각 스타일은 컴포넌트 내에 독립적으로 적용된다;
   - props를 통한 스타일링 가능, Nested 작성법 불가능

3. Global Styles

   - style 태그에 global props를 넣어주면 된다.

   - 문제점

     - 결국은 페이지에 따라 적용되기에 Home에서 적용한 전역 스타일은 다른 페이지에서는 적용이 되지 않는다.

   - 해결책
     - App Component를 사용한다.
     - 파일명 : \_app.js
     - 컴포넌트가 렌더링 되기 전에 NextJS는 App Component를 먼저 확인한다.
     ```
     export function App({Component, pageProps}) {
      return (
        <>
          <NavBar />
          <Component {...pageProps}>
          <style jsx global>{`
            a {
              color: white;
            }
          `}</style>
        </>
      )
     }
     ```

---

## Patterns

- Layout Component

```
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
```

- title 적용
  ```
  import Head from "next/head"
  ...
  <Head>
    <title>{타이틀 명}</title>
  </Head>
  ```

---

## Redirect & Rewrite

- Redirect
  - next.config.js 파일에서 경로를 설정 가능
  - 파일 수정시 재실행
  - 별표(\*)는 별표 이후의 경로를 catch하는 역할
  - source로 들어가서 destination으로 나온다.

```
const nextConfig = {
  ...
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      }
    ]
  }
}
```

- Rewrite
  - 유저를 redirect 시키지만 url은 변하지 않는다.
  - URL 프록시 역할
  - destination 경로를 masking 하여 변경사항을 알지 못하게 한다.

```
const nextConfig = {
  ...
  async rewrites() {
    return [
      {
        soure: "/api/products",
        destination: "https://fakestoreapi.com/products"
      }
    ]
  },
}
```

---

## Server Side Rendering

### **getServerSideProps()**

- getServerSideProps()
  - 이 함수에 들어있는 코드들은 client가 아니라 server 쪽에서 실행된다.
  - api key를 적으면 절대로 보이지 않는다.
- getServerSideProps 함수는 object를 반환
- props라는 key 혹은 property를 가지고 그 안에 필요한 값을 넣는다.
- absolute URL 즉, 완전한 URL 주소를 사용해야 한다.

```
export default function Home({data}) {
  ...
}

export async function getServerSideProps() {
  const data = await (await fetch(`http://localhost:3000/api/products`)).json();
  return {
    props: {
      data,
    },
  };
}
```

---

## Dynamic Routes

- 폴더명과 파일명으로 Routes를 만들어준다.
- 폴더의 index.js는 각 폴더명의 url을 가리킨다.
  - /movies <= movies > index.js
  - /movies/12321 < = movies > `[id].js`
  - useRouter 함수가 반환하는 객체 안의 query 키에서 발견 가능

---

[Course from nomadcoders / NextJS 시작하기](https://nomadcoders.co/nextjs-fundamentals)
