FROM python:3.12-alpine3.20

WORKDIR /bot

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 7070

CMD ["python", "app.py", "run"]