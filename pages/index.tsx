import React from 'react';
import { Typography } from '@material-ui/core';

const Index: React.FC = () => {
  return (
    <Typography
      style={{textAlign: 'center'}}
      color="textSecondary">
      <br/>
      <br/>
      Empathのトランスクライブプロジェクトに
      <br/>
      ご協力いただきありがとうございます。
      <br/>
      <br/>
      これから音声ファイルの内容の
      聞き起こしを行っていただきます。
      <br/>
      <br/>
      「保存＆次へ」ボタンを押すと次のページに移動できます。
      <br/>
      「終わる」ボタンを押すと、アプリが終了します。
      <br/>
      再開されるときは「終わる」ボタンを押した画面に戻ります。
    </Typography>
  );
};

export default Index;
