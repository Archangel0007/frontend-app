import json

def handler(event, context):
    # Extract HTTP method from the event
    method = event.get('httpMethod')

    if method == 'POST':
        try:
            # Extract and parse the request body
            body = json.loads(event.get('body', '{}'))
            data = body.get('data', [])

            # Example data structure for the response
            response = {
                'status': 'active',
                'user_id': 'john_doe_17091999',
                'college_email': 'user@example.com',
                'college_roll_number': 'CS101',
                'numbers': [item for item in data if isinstance(item, (int, float))],
                'alphabets': [item for item in data if isinstance(item, str) and item.isalpha()],
                'highest_lowercase_alphabet': max([item for item in data if isinstance(item, str) and item.islower()], default=None)
            }

            return {
                'statusCode': 200,
                'body': json.dumps(response),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid JSON input'}),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
    elif method == 'GET':
        return {
            'statusCode': 200,
            'body': json.dumps({'operation_code': 1}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method Not Allowed'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
