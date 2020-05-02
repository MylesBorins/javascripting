このワークショップで使うディレクトリを作りましょう。

次のコマンドを実行して、`esmoduling` ディレクトリを作ります。

```bash
mkdir esmoduling
```

`esmoduling` ディレクトリに移動しましょう。

```bash
cd esmoduling
```

次のコマンドで `introduction.js` ファイルを作成します。

```bash
touch introduction.js
```
 (Windowsを使っているのであれば `type NUL > introduction.js`)

お好みのエディタでファイルを開きます。次の文を書き足しましょう。

```js
console.log('hello')
```

ファイルを保存します。次のコマンドを実行し、あなたのプログラムが正しく動くか確認しましょう。

```bash
esmoduling verify introduction.js
```

