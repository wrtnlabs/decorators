# `@wrtn/decorators`
스튜디오 프로젝트를 위한 NestJS 디코레이터 모음.

```bash
npm i @wrtn/decorators
```




## `Placeholder<string>`
```typescript
import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";

export interface Something {
  /**
   * 고객의 이름.
   *
   * @title 이름
   */
  name: string & Placeholder<"이름을 입력해주세요.">;

  /**
   * 고객의 생년월일.
   *
   * @title 생년월일
   */
  birthdate: string &
    tags.Format<"date"> &
    Placeholder<"생년월일을 입력해주세요. 형식은 YYYY-MM-DD 입니다.">;

  flag: number & Placeholder<"Something">;
}
```

- [💻 JSON Schema Playground](https://typia.io/playground/?script=JYWwDg9gTgLgBDAnmYBDANHA3g1BzAZzgF84AzKCEOAIiRVRoG4AoF+gUzgAUAbVAMYcAFhF4ATDlAA8ANVS8Arlw4APGBwB24ogRhRgmvAD44AXlyEAdABV8AIVQEO0rCzi4oeDjABctACMIMQ5UTRo4AB9aTUUQAKkI6Jo9AyNmdzgAa0NxfxowfiFRCUTWDwA3BWV-eSUOcrgCAWEOEFR-Nw8PGlUAWgB3WE0+wsERMUkoGlrqhsziVmJjVhZDDSgycbgAZSofYUM8bEyAegAqc8y4c7hAA5rAXBrADXG4QBdxwBDOq2ur7tuAARgwBgvC4H2+p0ymlQIA4-lSRzgADIeEUJqUZDQAOoGDRwRAQRRQOBQmFWGgrNgeC4-Dy3R4vQC7A4ARRsAK2OAH3Gvr9vnAAUCQXBmezwZkAsBYMJxKgNHD9AjEddLAQrAAxaDtGDSGiSjTkpEKvjjEpTTXYoFcfGEuCi8XajhWOA2VrkNVSuDAIgATS9Hr6AFlfX0ACKBskUzJkfh4fyxeJSJEow2TKSavYwmCHdIU4hsehoKwAKwIEE0VlQYEKwAEUuAxekAG1UwcjgBdYwACgAlEwgA)

`boolean` 이나 `number` 및 `string` 타입을 부여할 때, 위와 같이 `Placeholder<string>` 타입을 `intersection (&)` 으로 결합해주면, JSON Schema 에 `x-wrtn-placeholder` 속성이 추가된다.

만일 위와 같은 JSON Schema customizer 가 필요하다면, 아래 문서를 보고 참고하여, 새로운 JSON Schema customizer 타입을 만들어주도록 하자. 그리고 새로이 추가한 커스텀 속성에 대하여, inspector 개발자들에게 전파하도록 한다.

- https://typia.io/docs/json/schema/#customization




## `SecretKey<string, string[]?>`
```typescript
export interface IGoogleDriveFileUploader {
  token: string & SecretKey<"google-auth-key">;
  location: string;
  file: File;
}
```

- [💻 JSON Schema Playground](https://typia.io/playground/?script=JYWwDg9gTgLgBDAnmYBDANHA3g1BzAZzgF84AzKCEOAIiRVRoG4AoF+gUzgGUOBjKBxgBpDogA8LOHABqqADYBXLhwAeMDgDsAJkQIwowTXnRSefCGA5E1GnUUU6OZIx21wAPnE0cAbhyhPOH1DYwBtAF04AF5vPwDTAD4Y3EIAOgAVfAAhVAIOcSwzGFQoPCEALloQozxmMwBrI20qml4BIVFEeulfBWUqx21nV21WaQI+AAsOEFQqoulpGlUAWgB3WE1V-I6YVYaxGiq5JQ5xpZWNrZ3+QX3Jy2tj8yeCC+JWYkTWFiMNKBkVB8LgASQA4hAIHh5BwACKGfwAMWAsIAqmB5BBUMNAosEBBDpoqjVjHAAGQ8O6dMTiGh4KEwjirVCKGBTA5HTBhGiCHE0TA0TbADQ0CI-MxYvioGDACDE4IGWoXFywqoo2FfNj0NBpABWBHlaVQYExwGlsvl4jCEMZsIRwGRqI4GKxOIC4oAFABKJhAA)

`SecretKey<string, string[]?>` 타입은 스튜디오의 워크플로우 프로그램에서 특정 커넥터 함수를 실행함에 있어, 어떠한 속성 내지 파라미터가 외부 서비스의 secret key 를 필요로 할 때 사용하는 타입이다. 만일 해당 서비스가 OAuth 의 `scopes` 에 대한 제약 또한 가해진 경우, 두 번째 template argument `string[]` 타입을 설정해주면 된다.

위 예제 코드 `IGoogleDriveFileUploader` 와 같이 구글 드라이브에 파일을 업로드하는 경우, DTO 수준에서 구글 사용자 인증 토큰이 필요하기 마련이다. 그리고 구글처럼 각각이 발생되는 사용자 인증 토큰에 OAuth 의 `scopes` 라는 제약을 두어 그 권한을 깐깐하게 관리하는 경우, 두 번째 파라미터 `string[]` 또한 그에 맞추어 설정해줘야 한다.




## `@RouteIcon()`
```typescript
export function RouteIcon(uri: string): MethodDecorator;
```

Controller 메서드에 `@RouteIcon()` 을 적용하면, 아이콘을 적용할 수 있다.

`@RouteIcon(url: string)` 에 입력한 URL 주소는 스웨거 문서의 해당 endpoint 부에, `ISwaggerRoute["x-wrtn-icon"]` 속성으로 기입된다.

단, 본 디코레이터는 파라미터로 입력한 URL 값의 실존 여부를 검증하지 않으니, 이 점 주의하기 바란다.