from django.test import TestCase
from django.contrib.auth import get_user_model
# Create your tests here.
class UserTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="bruce",
            email="bruce@example.com",
            password="safepass123",
        )

        self.assertEqual(user.username, 'bruce')
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        User = get_user_model()
        user = User.objects.create_user(
            username="bruce",
            email="bruce@example.com",
            password="safepass123",
        )

        self.assertEqual(user.username, 'bruce')
        self.assertFalse(user.is_staff)
        self.assertTrue(user.is_active)

    