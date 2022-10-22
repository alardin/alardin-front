package com.alardinapp; // 패키지 이름 수정

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        if (getIntent().getExtras() != null) { intent.putExtras(getIntent().getExtras()); }
        startActivity(intent);
        finish();
    }
}
