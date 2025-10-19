/**
 * Datapipe Helper Module
 * OSF への CSV データ保存を統一的に処理
 */

export async function saveToPipe(filename, experimentId, csvData) {
  console.log('[Datapipe] Saving to OSF:', { filename, experimentId });
  
  try {
    const response = await fetch('https://pipe.jspsych.org/api/v1/participants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        experiment_id: experimentId,
        filename: filename,
        data: csvData
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('[Datapipe] Data saved successfully:', result);
      return { 
        success: true, 
        url: result.url || '',
        filename: filename
      };
    } else {
      console.warn('[Datapipe] Save failed with status:', response.status);
      return { 
        success: false, 
        error: `HTTP ${response.status}`,
        filename: filename
      };
    }
  } catch (e) {
    console.error('[Datapipe] Save error:', e);
    return { 
      success: false, 
      error: e.message,
      filename: filename
    };
  }
}

/**
 * 保存結果を画面上に表示するメッセージを生成
 */
export function getSaveMessage(filename, result) {
  if (result && result.success === true) {
    return `<div class="small muted">✓ データはOSFに保存されました（${filename}）。</div>`;
  } else if (result && result.success === false) {
    return `<div class="small danger">⚠ データ保存に失敗しました（${result.error || 'unknown error'}）。ただしブラウザに結果が表示されています。</div>`;
  } else {
    return `<div class="small danger">⚠ データ保存の状態を確認できません。ブラウザに結果が表示されています。</div>`;
  }
}
