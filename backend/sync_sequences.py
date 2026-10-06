import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.db import connection

def reset_sequences():
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT c.relname, a.attname
            FROM pg_class c
            JOIN pg_attribute a ON a.attrelid = c.oid
            JOIN pg_namespace n ON n.oid = c.relnamespace
            WHERE a.attnum > 0
              AND NOT a.attisdropped
              AND n.nspname = 'public'
              AND c.relkind = 'r'
              AND a.attname = 'id';
        """)
        tables = cursor.fetchall()
        for tablename, colname in tables:
            try:
                cursor.execute(f"SELECT pg_get_serial_sequence('{tablename}', '{colname}');")
                res = cursor.fetchone()
                seq = res[0] if res else None
                if seq:
                    cursor.execute(f"SELECT COALESCE(MAX({colname}), 0) + 1 FROM \"{tablename}\";")
                    next_val = cursor.fetchone()[0]
                    cursor.execute(f"SELECT setval('{seq}', {next_val}, false);")
                    print(f"Reset {seq} -> {next_val}")
            except Exception as e:
                print(f"Skipping {tablename}: {e}")

if __name__ == "__main__":
    reset_sequences()
