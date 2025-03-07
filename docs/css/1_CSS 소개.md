# 1. CSS 소개

웹 개발에서 **CSS** (Cascading Style Sheets)는 HTML 이라는 뼈대를 꾸며주는 "형용사" 혹은 "디자인" 같은 시각적인 부분을 담당하고 있습니다.

## CSS란 무엇인가?

CSS는 웹 페이지의 스타일과 레이아웃을 지정하는 언어입니다. HTML이 웹 페이지의 구조와 내용을 정의한다면, CSS는 그 구조에 생명을 불어넣어 시각적으로 매력적이고 사용자 친화적인 디자인을 구현합니다. CSS를 사용하면 색상, 폰트, 여백, 배경, 레이아웃 등을 세밀하게 조정할 수 있습니다.

### CSS의 주요 기능

- **스타일링**: 텍스트, 이미지, 버튼 등 다양한 요소의 스타일을 지정합니다.
- **레이아웃 관리**: 웹 페이지의 전체적인 구조와 배치를 조정합니다.
- **반응형 디자인**: 다양한 디바이스와 화면 크기에 맞춰 유연하게 변하는 디자인을 구현합니다.
- **애니메이션 및 전환**: 웹 페이지에 생동감을 더하는 애니메이션 효과를 추가합니다.

### CSS의 필요성

현대 웹 개발에서 CSS는 필수적인 요소로 자리잡고 있습니다. 그 이유는 다음과 같습니다:

1. **시각적 일관성**: CSS를 사용하면 웹 사이트 전반에 걸쳐 일관된 디자인을 유지할 수 있습니다. 동일한 스타일시트를 여러 페이지에 적용하여 전체적인 통일감을 줄 수 있습니다.
2. **유지보수 용이성**: CSS를 별도의 파일로 관리하면 디자인 변경 시 HTML 파일을 일일이 수정할 필요 없이 CSS 파일만 수정하면 됩니다. 이는 개발 효율성을 크게 향상시킵니다.
3. **검색 엔진 최적화 (SEO)**: 깔끔하게 구조화된 CSS는 검색 엔진이 웹 페이지를 더 잘 이해하고 색인화하는 데 도움을 줍니다.
4. **접근성 향상**: 적절한 스타일링을 통해 시각적 접근성을 개선할 수 있으며, 다양한 사용자 요구에 맞춘 디자인을 구현할 수 있습니다.
5. **성능 최적화**: CSS는 스타일을 캐시할 수 있어 페이지 로딩 속도를 향상시킬 수 있습니다.

### HTML과 CSS의 관계

HTML과 CSS는 웹 개발의 기본을 이루는 두 축입니다. 이 둘은 서로 보완적인 관계에 있으며, 함께 사용될 때 강력한 웹 페이지를 만들어냅니다.

- **HTML (HyperText Markup Language)**: 웹 페이지의 구조와 내용을 정의합니다. 제목, 단락, 목록, 이미지, 링크 등 다양한 요소를 배치하고 구성합니다.
- **CSS (Cascading Style Sheets)**: HTML로 정의된 구조에 스타일을 적용하여 시각적으로 표현합니다. 색상, 폰트, 레이아웃, 애니메이션 등을 통해 웹 페이지의 디자인을 완성합니다.

#### HTML과 CSS의 통합 방법

1. **인라인 스타일**: HTML 요소 내에 `style` 속성을 사용하여 직접 스타일을 지정합니다.
   ```html
   <p style="color: blue; font-size: 16px;">안녕하세요!</p>
   ```
2. **내부 스타일시트**: HTML 문서의 `<head>` 섹션에 `<style>` 태그를 사용하여 스타일을 정의합니다.
   ```html
   <head>
     <style>
       p {
         color: blue;
         font-size: 16px;
       }
     </style>
   </head>
   ```
3. **외부 스타일시트**: 별도의 `.css` 파일을 만들어 HTML 문서에 링크하여 스타일을 적용합니다.
   ```html
   <head>
     <link rel="stylesheet" href="styles.css" />
   </head>
   ```
   ```css
   /* styles.css */
   p {
     color: blue;
     font-size: 16px;
   }
   ```

#### CSS의 계단식 특성

CSS는 "Cascading"이라는 이름에서 알 수 있듯이, 계단식으로 스타일이 적용되는 특성을 가지고 있습니다. 이는 스타일 규칙이 특정 우선순위에 따라 적용되며, 충돌이 발생할 경우 특정 규칙이 다른 규칙을 덮어쓰는 방식으로 동작합니다. 이를 통해 개발자는 더 세밀한 스타일링과 우선순위 관리를 할 수 있습니다.

### 요약

- CSS는 웹 페이지의 시각적 디자인과 레이아웃을 담당하는 필수 기술로, HTML과 함께 사용되어 웹 개발의 기본을 이룹니다.
- CSS를 통해 웹 페이지를 더욱 아름답고 사용자 친화적으로 만들 수 있으며, 유지보수와 성능 최적화에도 큰 도움이 됩니다.

다음 장에서는 CSS를 실제로 적용하는 방법과 개발 환경을 설정하는 방법에 대해 알아보겠습니다.
