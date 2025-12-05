import json
import os
import http.client
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Генерирует изображение игрушки по описанию с помощью Flux нейросети
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name
    Returns: HTTP response dict с URL изображения
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    body_data = json.loads(body_str)
    description = body_data.get('description', '')
    
    if not description:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Описание игрушки обязательно'}),
            'isBase64Encoded': False
        }
    
    flux_api_key = os.environ.get('FLUX_API_KEY', '')
    
    if not flux_api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API ключ не настроен'}),
            'isBase64Encoded': False
        }
    
    prompt = f"cute toy, plushie, {description}, colorful, childrens toy, soft material, high quality product photography, white background"
    
    conn = http.client.HTTPSConnection("api.bfl.ml")
    
    payload = json.dumps({
        "prompt": prompt,
        "width": 512,
        "height": 512
    })
    
    headers = {
        'Content-Type': 'application/json',
        'X-Key': flux_api_key
    }
    
    conn.request("POST", "/v1/flux-pro-1.1", payload, headers)
    res = conn.getresponse()
    data = res.read()
    result = json.loads(data.decode("utf-8"))
    
    if res.status != 200:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Ошибка генерации изображения'}),
            'isBase64Encoded': False
        }
    
    task_id = result.get('id', '')
    
    import time
    max_attempts = 30
    for i in range(max_attempts):
        time.sleep(2)
        
        conn = http.client.HTTPSConnection("api.bfl.ml")
        conn.request("GET", f"/v1/get_result?id={task_id}", headers={'X-Key': flux_api_key})
        res = conn.getresponse()
        data = res.read()
        result = json.loads(data.decode("utf-8"))
        
        if result.get('status') == 'Ready':
            image_url = result.get('result', {}).get('sample', '')
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'imageUrl': image_url}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 408,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Превышено время ожидания'}),
        'isBase64Encoded': False
    }
