
# 概要
* LINEチャットルームに対してメッセージを送信するための GCP Cloud Functions コード
* LINE Notify を利用
* 使い方としては、下記を想定
  1. GCP Cloud Scheduler が設定した時間にHTTPリクエストを送信する
  1. GCP Cloud Functions がリクエスト受け、メッセージを加工して LINE Notify に送信する
  1. LINEチャットルームにメッセージが送信される

# 構築
## 事前準備
* gcloudコマンドを打てるようにして、ログインしておく
* LINE Notify に登録してトークン取得しておく
    * https://notify-bot.line.me/ja/


## ローカルでテスト
* LINEトークンを package.json の config.line_token に設定
* ローカルでアプリを起動し、LINEにメッセージが送信されることを確認

    ```
    npm install
    npm run test
    ```

## デプロイ
* Functions を構築
  * 環境変数にLineトークンを設定する [1]
    * 名前：LINE_TOKEN 
    * 値：{Lineトークン}
* package.json の config に設定値を記入
    ```
    "config": {
        "function_name": "XXXXXXXXXXFUNCTIONNAMEXXXXXXXXXX",
        "region": "asia-northeast1",
        "gcp_project": "XXXXXXXXXXGCPPROJECTNAMEXXXXXXXXXX",
        "runtime": "nodejs12",
        "line_token": "XXXXXXXXXXTOKENXXXXXXXXXX"
    },
    ```
* デプロイ実施
    ```
    npm run deploy
    ```
* Scheduler を構築・設定
    * 設定値 [2] [3]
        * URL： {FunctionsのURL}
        * HTTPメソッド： POST
        * 本文： {"mainMessage":"XXXXXXXXXX","from":"GCP-Scheduler"}

# 備考
* Functions 環境変数 [1]
  * package.json に設定した line_token は、Function では環境変数として使えない模様
  * よって、Functions の環境変数に line_token を設定する必要あり
* Scheduler 送信データ [2]
  * Scheduler を設定する際、GUIからHTTPヘッダーを設定できない（2020/11現在）
  * Functions で受け取ったデータは octet/stream と判断されているようなので、コード内でJSONにパースする処理を行なっている
* Line [3]
  * 改行文字は「\n」
  * メッセージにURLリンクを含める際、URLに「?openExternalBrowser=1」を付与するとWebViewでなくブラウザで開くようになる（iPhone, Android）


# 参考
* https://github.com/flatfisher/cloud-functions-typescript-template