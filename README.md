> 레파지토리 이름은 임의로 설정했습니다ㅎ 바꿔주세요!

### 환경 설정

1. mysql config 설정

   `config/development.json` 에 mysql user, password 설정해주세요!

   `config/production.json` < production mode일 때 따로 설정하도록 파일 분리해놨습니다. 일단 기본은 development mode라서 아직 따로 설정할 필요 없어요

2. mysql test data

   ````mysql
   mysql> CREATE DATABASE test;
   mysql> use test;
   mysql> CREATE TABLE IF NOT EXISTS Users (
     id VARCHAR(45) NOT NULL,
     password VARCHAR(45) NOT NULL,
     PRIMARY KEY (id));
   
   mysql> INSERT INTO Users (id, password) VALUES ('ungmo2', '1234');
   ````

3. 시작 방법

   우선 터미널에서 각 폴더마다 `yarn` 을 쳐서 디펜던시 설치해주세요!

   ```c
   // client 실행할 때 -> localhost:3000
   $ yarn run client
   // server 실행할 때 -> localhost:5000
   $ yarn run server
   ```

4. 서버에서 데이터 들어오는지 확인

   `http://localhost:5000/test/ungmo2` 접속해서 아래와 같이 나오는지 확인해주세여

5. 클라이언트에서 서버 데이터 받는지 확인

   `http://localhost:3000` 에서 아래 1234 숫자가 나오는지 확인