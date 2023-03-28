/*************************************************************************************************
 * 이 함수는 key 값을 인자로 받아 localStorage에서 key 값에 해당하는 값을 가져와 state 값을 업데이트하고,
 * state 값이 변경될 때마다 localStorage에 업데이트된 값을 저장합니다.
 * 함수 내부에서 JSON.parse와 JSON.stringify 함수를 사용하여 데이터를 처리합니다.
 * 아래 주석은 ChatGPT 를 사용하여 자동으로 입력받은 주석 입니다.
 *************************************************************************************************/
const localStorageEffect = // localStorageEffect 함수 선언

    (
      key: string // 문자열 타입의 key 매개변수를 받는 함수를 반환
    ) =>
    ({ setSelf, onSet }: any) => {
      // 객체 타입의 매개변수를 받아 setSelf와 onSet을 추출하는 함수를 반환
      const savedValue = localStorage.getItem(key); // localStorage에서 key에 해당하는 값을 가져와 savedValue 변수에 할당
      if (savedValue !== null && savedValue !== undefined) {
        // savedValue가 null이나 undefined가 아닌 경우
        const json = (data: string) => {
          // data 매개변수를 받아 JSON.parse를 실행하는 함수 json 선언
          try {
            // try 블록 안에서 JSON.parse 실행
            return JSON.parse(data);
          } catch (error) {
            // 예외가 발생하면 false 반환
            return false;
          }
        };

        if (json(savedValue)) {
          // json 함수를 이용해 savedValue를 JSON.parse 할 수 있는 경우
          setSelf(JSON.parse(savedValue)); // savedValue를 JSON.parse 하고 setSelf 함수를 이용해 state를 업데이트
        }
      }

      onSet((newValue: any) => {
        // state가 업데이트 되면 실행되는 함수
        localStorage.setItem(key, JSON.stringify(newValue)); // localStorage에 key와 업데이트된 state 값을 JSON.stringify를 이용해 저장
      });
    };

export default localStorageEffect; // localStorageEffect 함수를 모듈로 내보냄
